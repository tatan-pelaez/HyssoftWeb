sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("HyssoftWeb.HyssoftWeb.controller.Programas_Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("programas_detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Programas('" + oArgs.NOMBRE + "')",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},

		onDelete0: function (oEvent) {
			var Empresas = oEvent.getSource().getBindingContext().getObject();
			var Model = this.getView().getModel();
			var empnit = Empresas["NOMBRE"];
			Model.remove("/Programas('" + empnit + "')", true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Programas_Lista");
		},

		modificarconsultor: function (oEvent) {
			var CEDULA = this.getView().byId("CEDULA").getValue();
			var NOMBRE = this.getView().byId("NOMBRE").getValue();
			var CARGO = this.getView().byId("CARGO").getValue();
			var PAIS = this.getView().byId("PAIS").getValue();
			var CIUDAD = this.getView().byId("CIUDAD").getValue();
			var TELEFONO = this.getView().byId("TELEFONO").getValue();
			var CELULAR = this.getView().byId("CELULAR").getValue();
			var ESTADO = "Activo";
			var payLoad = {
				"CEDULA": CEDULA,
				"NOMBRE": NOMBRE,
				"CARGO": CARGO,
				"PAIS": PAIS,
				"CIUDAD": CIUDAD,
				"TELEFONO": TELEFONO,
				"CELULAR": CELULAR,
				"ESTADO": ESTADO
			};
			var Model = this.getView().getModel();
			Model.update("/Consultores('" + CEDULA + "')", payLoad, {});
		},
		handleNavButtonPress: function (evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
		},
		/**
		 *@memberOf Hyssoft.Hyssoft.controller.Detail
		 */
		
		/**
		 *@memberOf HyssoftWeb.HyssoftWeb.controller.Consultores_Detail
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