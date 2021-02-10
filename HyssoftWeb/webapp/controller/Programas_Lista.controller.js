sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Programas_Lista", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Programas_Lista
		 */
		onInit: function () {},
		
		handleListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedNOMBRE = oEvent.getSource().getBindingContext().getProperty("NOMBRE");
			oRouter.navTo("programas_detail", {
				NOMBRE: selectedNOMBRE
			});
		},

		onFilterProducts: function (oEvent) {
			var prodFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				prodFilter.push(new Filter("NOMBRE", FilterOperator.Contains, sQuery));
			}
			var oList = this.byId("Programas");
			var oBinding = oList.getBinding("items");
			oBinding.filter(prodFilter);
		},
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Programas_Lista
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});