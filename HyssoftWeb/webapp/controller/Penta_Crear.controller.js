sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Penta_Crear", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf HyssoftWeb.HyssoftWeb.view.Penta_Crear
		 */
		onInit: function () {},
		crearpenta: function () {
				var DESCRIPCION = this.getView().byId("DESCRIPCION").getValue();
				var FECHA = this.getView().byId("FECHA").getValue();
				var NIT_NIT = this.getView().byId("NIT_NIT").getValue();
				var PROGRAMA_NOMBRE = this.getView().byId("PROGRAMA_NOMBRE").getValue();
				var INCLUDE_NOMBRE = this.getView().byId("INCLUDE_NOMBRE").getValue();
				var CONSULTOR_CEDULA = this.getView().byId("CONSULTOR_CEDULA").getValue();
				var payLoad = {
					"DESCRIPCION": DESCRIPCION,
					"FECHA": FECHA,
					"NIT_NIT": NIT_NIT,
					"PROGRAMA_NOMBRE": PROGRAMA_NOMBRE,
					"INCLUDE_NOMBRE": INCLUDE_NOMBRE,
					"CONSULTOR_CEDULA": CONSULTOR_CEDULA
				};
				var Model = this.getView().getModel();
				Model.create("/PentaEmpresa", payLoad, {});
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Penta_Lista");
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf HyssoftWeb.HyssoftWeb.view.Penta_Crear
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf HyssoftWeb.HyssoftWeb.view.Penta_Crear
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf HyssoftWeb.HyssoftWeb.view.Penta_Crear
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Penta_Crear
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