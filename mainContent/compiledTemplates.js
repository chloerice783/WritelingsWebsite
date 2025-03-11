(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['textFileIcon'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"text-file-icon clickable\" data-text_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":51},"end":{"line":1,"column":58}}}) : helper)))
    + "  data-text_status="
    + alias4(((helper = (helper = lookupProperty(helpers,"text_status") || (depth0 != null ? lookupProperty(depth0,"text_status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text_status","hash":{},"data":data,"loc":{"start":{"line":1,"column":77},"end":{"line":1,"column":92}}}) : helper)))
    + " data-text_content="
    + alias4(((helper = (helper = lookupProperty(helpers,"text_content") || (depth0 != null ? lookupProperty(depth0,"text_content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text_content","hash":{},"data":data,"loc":{"start":{"line":1,"column":111},"end":{"line":1,"column":127}}}) : helper)))
    + " data-reward_rarity="
    + alias4(((helper = (helper = lookupProperty(helpers,"reward_rarity") || (depth0 != null ? lookupProperty(depth0,"reward_rarity") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reward_rarity","hash":{},"data":data,"loc":{"start":{"line":1,"column":147},"end":{"line":1,"column":164}}}) : helper)))
    + " data-text_title="
    + alias4(((helper = (helper = lookupProperty(helpers,"text_title") || (depth0 != null ? lookupProperty(depth0,"text_title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text_title","hash":{},"data":data,"loc":{"start":{"line":1,"column":181},"end":{"line":1,"column":195}}}) : helper)))
    + " data-word_goal="
    + alias4(((helper = (helper = lookupProperty(helpers,"word_goal") || (depth0 != null ? lookupProperty(depth0,"word_goal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"word_goal","hash":{},"data":data,"loc":{"start":{"line":1,"column":211},"end":{"line":1,"column":224}}}) : helper)))
    + " data-word_count="
    + alias4(((helper = (helper = lookupProperty(helpers,"word_count") || (depth0 != null ? lookupProperty(depth0,"word_count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"word_count","hash":{},"data":data,"loc":{"start":{"line":1,"column":241},"end":{"line":1,"column":255}}}) : helper)))
    + " data-due_date="
    + alias4(((helper = (helper = lookupProperty(helpers,"due_date") || (depth0 != null ? lookupProperty(depth0,"due_date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"due_date","hash":{},"data":data,"loc":{"start":{"line":1,"column":270},"end":{"line":1,"column":282}}}) : helper)))
    + ">\r\n  <div class=\"text-file-header\">\r\n    <span class=\"text-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text_title") || (depth0 != null ? lookupProperty(depth0,"text_title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text_title","hash":{},"data":data,"loc":{"start":{"line":3,"column":29},"end":{"line":3,"column":43}}}) : helper)))
    + "</span>\r\n  </div>\r\n\r\n  <div class=\"text-file-footer\">\r\n    <span class=\"text-status\">Status: "
    + alias4(((helper = (helper = lookupProperty(helpers,"text_status") || (depth0 != null ? lookupProperty(depth0,"text_status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text_status","hash":{},"data":data,"loc":{"start":{"line":7,"column":38},"end":{"line":7,"column":53}}}) : helper)))
    + "</span>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['creatureSlot'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"creature-slot\" data-rarity=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_rarity") || (depth0 != null ? lookupProperty(depth0,"creature_rarity") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_rarity","hash":{},"data":data,"loc":{"start":{"line":1,"column":40},"end":{"line":1,"column":59}}}) : helper)))
    + " \"data-description=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_description") || (depth0 != null ? lookupProperty(depth0,"creature_description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_description","hash":{},"data":data,"loc":{"start":{"line":1,"column":79},"end":{"line":1,"column":103}}}) : helper)))
    + "\" data-amount="
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_amount") || (depth0 != null ? lookupProperty(depth0,"creature_amount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_amount","hash":{},"data":data,"loc":{"start":{"line":1,"column":117},"end":{"line":1,"column":136}}}) : helper)))
    + " \r\ndata-index=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_index") || (depth0 != null ? lookupProperty(depth0,"creature_index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_index","hash":{},"data":data,"loc":{"start":{"line":2,"column":12},"end":{"line":2,"column":30}}}) : helper)))
    + "\" data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_id") || (depth0 != null ? lookupProperty(depth0,"creature_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_id","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":55}}}) : helper)))
    + " data-image="
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_image") || (depth0 != null ? lookupProperty(depth0,"creature_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_image","hash":{},"data":data,"loc":{"start":{"line":2,"column":67},"end":{"line":2,"column":85}}}) : helper)))
    + " data-species=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_species") || (depth0 != null ? lookupProperty(depth0,"creature_species") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_species","hash":{},"data":data,"loc":{"start":{"line":2,"column":100},"end":{"line":2,"column":120}}}) : helper)))
    + "\">\r\n  <div class=\"creature-slot-header\">\r\n    <span>Index </span><span class= \"index_num\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_index") || (depth0 != null ? lookupProperty(depth0,"creature_index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_index","hash":{},"data":data,"loc":{"start":{"line":4,"column":48},"end":{"line":4,"column":66}}}) : helper)))
    + ": </span><span class=\"creature-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_species") || (depth0 != null ? lookupProperty(depth0,"creature_species") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_species","hash":{},"data":data,"loc":{"start":{"line":4,"column":103},"end":{"line":4,"column":123}}}) : helper)))
    + "</span>\r\n  </div>\r\n\r\n  <div class=\"creature-image\">\r\n    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"creature_image") || (depth0 != null ? lookupProperty(depth0,"creature_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creature_image","hash":{},"data":data,"loc":{"start":{"line":8,"column":13},"end":{"line":8,"column":31}}}) : helper)))
    + ">\r\n  </div>\r\n\r\n  <div class=\"creature-slot-footer\">\r\n    <button type='button' class=\"creature-slot-button\">Info</button>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['eggSlot'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"egg-slot\" data-rarity="
    + alias4(((helper = (helper = lookupProperty(helpers,"egg_rarity") || (depth0 != null ? lookupProperty(depth0,"egg_rarity") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"egg_rarity","hash":{},"data":data,"loc":{"start":{"line":1,"column":34},"end":{"line":1,"column":48}}}) : helper)))
    + "\r\ndata-index="
    + alias4(((helper = (helper = lookupProperty(helpers,"egg_index") || (depth0 != null ? lookupProperty(depth0,"egg_index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"egg_index","hash":{},"data":data,"loc":{"start":{"line":2,"column":11},"end":{"line":2,"column":24}}}) : helper)))
    + " data-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":40}}}) : helper)))
    + " data-image="
    + alias4(((helper = (helper = lookupProperty(helpers,"egg_image") || (depth0 != null ? lookupProperty(depth0,"egg_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"egg_image","hash":{},"data":data,"loc":{"start":{"line":2,"column":52},"end":{"line":2,"column":65}}}) : helper)))
    + ">\r\n  <div class=\"egg-slot-header\">\r\n    <span>Rarity: </span><span class= \"egg_rarity\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"egg_rarity") || (depth0 != null ? lookupProperty(depth0,"egg_rarity") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"egg_rarity","hash":{},"data":data,"loc":{"start":{"line":4,"column":51},"end":{"line":4,"column":65}}}) : helper)))
    + " </span>\r\n  </div>\r\n\r\n  <div class=\"egg-image\">\r\n    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"egg_image") || (depth0 != null ? lookupProperty(depth0,"egg_image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"egg_image","hash":{},"data":data,"loc":{"start":{"line":8,"column":13},"end":{"line":8,"column":26}}}) : helper)))
    + ">\r\n  </div>\r\n\r\n  <div class=\"egg-slot-footer\">\r\n    <button type='button' class=\"hatch-button\">Hatch</button>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();