/**
 * Japan Trip Guide — shared lists backend (Google Apps Script)
 * ----------------------------------------------------------------
 * Serves the two Google Sheets (trylist, tabung) to the HTML guide and
 * accepts edits from it. Deploy once as a Web App:
 *   Deploy ▸ New deployment ▸ type: Web app
 *   Execute as: Me            Who has access: Anyone
 * Copy the /exec URL into SHARED_API_URL near the top of Japan_Trip_Guide_V72.html.
 *
 * Nobody else logs in: the script runs as the deployer, and the two passwords
 * below are checked here, on the server, for every write.
 */

var SHEETS = {
  trylist: { id: "1tom-ULU6yPkGP5vZ6R2OHSdpjCeibzTNiJ6JFuO0NXc", password: "ViTroxAIS",
             tabs: ["TryList", "Meta"] },
  tabung:  { id: "1PvZx_wpyCqcD6wpTuFhtGejgP13O5F8E1ZscYjOJWAI", password: "NoNameAgong",
             tabs: ["Members", "Moves", "Meta"] }
};

function out(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* GET  ?list=all | trylist | tabung   ->  {ok, <list>: {sheets:{Tab:[{col:val,...}]}, revision}} */
function doGet(e){
  var want = (e && e.parameter && e.parameter.list) || "all";
  var res = { ok: true, serverTime: new Date().toISOString() };
  Object.keys(SHEETS).forEach(function(k){
    if(want === "all" || want === k){
      try { res[k] = readList(k); } catch(err){ res[k] = { error: String(err) }; }
    }
  });
  return out(res);
}

/* POST body (text/plain JSON):
   { list:"trylist"|"tabung", password:"...", baseRevision:3, by:"Agnes",
     sheets:{ TryList:[[header...],[row...],...], Meta:[[...]] } }
   Rewrites the given tabs, bumps Meta.revision by 1, returns the fresh copy.
   If baseRevision no longer matches the sheet -> {ok:false, error:"conflict", data:<current>} */
function doPost(e){
  var body;
  try { body = JSON.parse(e.postData.contents); } catch(err){ return out({ ok:false, error:"bad json" }); }
  var cfg = SHEETS[body.list];
  if(!cfg) return out({ ok:false, error:"unknown list" });
  if(String(body.password || "") !== cfg.password) return out({ ok:false, error:"bad password" });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var cur = readList(body.list);
    if(body.baseRevision !== undefined && body.baseRevision !== null &&
       Number(cur.revision) !== Number(body.baseRevision)){
      return out({ ok:false, error:"conflict", data:cur });
    }
    var newRev = Number(cur.revision || 0) + 1;
    writeList(body.list, body.sheets || {}, newRev, body.by || "");
    SpreadsheetApp.flush();
    return out({ ok:true, data: readList(body.list) });
  } catch(err){
    return out({ ok:false, error:String(err) });
  } finally {
    lock.releaseLock();
  }
}

function readList(key){
  var cfg = SHEETS[key], ss = SpreadsheetApp.openById(cfg.id), sheets = {}, revision = 0;
  cfg.tabs.forEach(function(name){
    var sh = ss.getSheetByName(name);
    if(!sh){ sheets[name] = []; return; }
    var vals = sh.getDataRange().getValues();
    if(vals.length < 2){ sheets[name] = []; return; }
    var head = vals[0].map(function(h){ return String(h).trim(); });
    var rows = [];
    for(var r = 1; r < vals.length; r++){
      var row = vals[r], obj = {}, empty = true;
      for(var c = 0; c < head.length; c++){
        if(!head[c]) continue;
        var v = row[c];
        if(v instanceof Date) v = Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
        if(v !== "" && v !== null && v !== undefined) empty = false;
        obj[head[c]] = v;
      }
      if(!empty) rows.push(obj);
    }
    sheets[name] = rows;
  });
  (sheets["Meta"] || []).forEach(function(r){ if(String(r.key).trim() === "revision") revision = Number(r.value) || 0; });
  return { sheets: sheets, revision: revision };
}

function writeList(key, incoming, newRev, by){
  var cfg = SHEETS[key], ss = SpreadsheetApp.openById(cfg.id);
  cfg.tabs.forEach(function(name){
    var aoa = incoming[name];
    if(name === "Meta"){
      aoa = [["key","value"], ["revision", newRev], ["updated", new Date().toISOString()],
             ["updated_by", by], ["guide_version", (incoming.__guide_version || "")]];
    }
    if(!aoa || !aoa.length) return;
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    var width = aoa.reduce(function(m, r){ return Math.max(m, r.length); }, 1);
    var norm = aoa.map(function(r){ var x = r.slice(); while(x.length < width) x.push(""); return x.map(function(v){ return v === null || v === undefined ? "" : v; }); });
    sh.clearContents();
    sh.getRange(1, 1, norm.length, width).setValues(norm);
    sh.setFrozenRows(1);
  });
}

/* Run once from the editor to confirm both sheets open (Run ▸ testRead). */
function testRead(){
  Logger.log(JSON.stringify(readList("trylist")).slice(0, 400));
  Logger.log(JSON.stringify(readList("tabung")).slice(0, 400));
}
