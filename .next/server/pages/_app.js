/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/AuthContext.js":
/*!*************************************!*\
  !*** ./src/contexts/AuthContext.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider),\n/* harmony export */   \"signOut\": () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_1__]);\nreact_toastify__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\nvar _jsxFileName = \"/Users/igormaciel/Desktop/Projetos/facil-reactjs/src/contexts/AuthContext.js\";\n\n\n\n\n //import { getSortedRoutes } from 'next/dist/shared/lib/router/utils';\n\n\nconst AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();\nfunction signOut() {\n  try {\n    (0,nookies__WEBPACK_IMPORTED_MODULE_2__.destroyCookie)(undefined, '@nextauth.token', {\n      path: '/'\n    });\n    next_router__WEBPACK_IMPORTED_MODULE_3___default().push('/');\n    console.log('Minha Rota', (next_router__WEBPACK_IMPORTED_MODULE_3___default().pathname));\n    console.log('Caiu no Try SignOut');\n  } catch {\n    console.log(\"Erro ao deslogar\");\n  }\n}\nfunction AuthProvider({\n  children\n}) {\n  const {\n    0: user,\n    1: setUser\n  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const {\n    0: load,\n    1: setLoad\n  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); //const router = useRouter()\n\n  function loadStorage() {\n    const storageUser = localStorage.getItem('@AuthUser');\n    setUser(JSON.parse(storageUser));\n    const {\n      '@nextauth.token': token\n    } = (0,nookies__WEBPACK_IMPORTED_MODULE_2__.parseCookies)();\n    console.log('Meu Token...', token);\n  }\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    loadStorage();\n  }, []); //console.log(\"CHAMOU MEU CONTEXTO\")\n\n  async function SignIn({\n    email,\n    password\n  }) {\n    setLoad(true);\n    var data;\n    data = {\n      email: email,\n      password: password\n    };\n    await axios__WEBPACK_IMPORTED_MODULE_4___default().post('https://app-facil-1cc4efc41cdc.herokuapp.com/user/login/', data).then(function (response) {\n      if (response.status === 200) {\n        //console.log('CAIU NOS 200 LOGIN', response.data.user);\n        localStorage.setItem('@AuthUser', JSON.stringify(response.data.user));\n        const usuario = localStorage.getItem('@AuthUser'); // console.log('RESULT LOGIN', userStorage)\n\n        setUser(JSON.parse(usuario));\n        react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success('Logado com sucesso!');\n        const {\n          token\n        } = response.data;\n        (0,nookies__WEBPACK_IMPORTED_MODULE_2__.setCookie)(undefined, '@nextauth.token', token, {\n          maxAge: 60 * 60 * 24 * 30,\n          // expirar em 1 mes\n          path: \"/\" // quais caminhos terao acesso ao cookies\n\n        }); //Router.push('/Home')\n\n        next_router__WEBPACK_IMPORTED_MODULE_3___default().push('/CentroCusto/OrdemCompra');\n      }\n\n      setLoad(false);\n    }).catch(function (error) {\n      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error('Verifique os campos digitados!');\n      console.log('ERRO AO LOGAR', error);\n      setLoad(false);\n    });\n  }\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(AuthContext.Provider, {\n    value: {\n      user,\n      load,\n      SignIn,\n      signOut\n    },\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 87,\n    columnNumber: 5\n  }, this);\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RmtDLFNBQXJDLENBQVQsQ0FWMkIsQ0FjM0I7O0FBQ0FMLFFBQUFBLHVEQUFBLENBQVksMEJBQVo7QUFDRDs7QUFDRGUsTUFBQUEsT0FBTyxDQUFDLEtBQUQsQ0FBUDtBQUNGLEtBcEJJLEVBcUJKcUIsS0FyQkksQ0FxQkUsVUFBU0MsS0FBVCxFQUFlO0FBQ3JCekMsTUFBQUEsdURBQUEsQ0FBWSxnQ0FBWjtBQUNDVyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCNkIsS0FBNUI7QUFDQXRCLE1BQUFBLE9BQU8sQ0FBQyxLQUFELENBQVA7QUFDRCxLQXpCSSxDQUFOO0FBMkJBOztBQUVBLHNCQUNFLDhEQUFDLFdBQUQsQ0FBYSxRQUFiO0FBQXNCLFNBQUssRUFBRTtBQUFDSCxNQUFBQSxJQUFEO0FBQU1FLE1BQUFBLElBQU47QUFBWVMsTUFBQUEsTUFBWjtBQUFvQnBCLE1BQUFBO0FBQXBCLEtBQTdCO0FBQUEsY0FDR1E7QUFESDtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFLRCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmFyaXJpLWFwcC8uL3NyYy9jb250ZXh0cy9BdXRoQ29udGV4dC5qcz83ODc2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XG5pbXBvcnQgeyBkZXN0cm95Q29va2llLCBzZXRDb29raWUsIHBhcnNlQ29va2llcyB9IGZyb20gJ25vb2tpZXMnO1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5cbi8vaW1wb3J0IHsgZ2V0U29ydGVkUm91dGVzIH0gZnJvbSAnbmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2lnbk91dCgpIHtcbiAgdHJ5e1xuICAgIGRlc3Ryb3lDb29raWUodW5kZWZpbmVkLCAnQG5leHRhdXRoLnRva2VuJyx7cGF0aDogJy8nfSk7XG4gICAgUm91dGVyLnB1c2goJy8nKVxuICAgIGNvbnNvbGUubG9nKCdNaW5oYSBSb3RhJywgUm91dGVyLnBhdGhuYW1lKVxuICAgIGNvbnNvbGUubG9nKCdDYWl1IG5vIFRyeSBTaWduT3V0JylcbiAgfWNhdGNoe1xuICAgIGNvbnNvbGUubG9nKFwiRXJybyBhbyBkZXNsb2dhclwiKVxuICB9ICBcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoe2NoaWxkcmVufSl7XG5cbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUoe30pXG4gIGNvbnN0IFtsb2FkLCBzZXRMb2FkXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAvL2NvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgXG4gIGZ1bmN0aW9uIGxvYWRTdG9yYWdlKCkgeyAgICBcbiAgICBjb25zdCBzdG9yYWdlVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdAQXV0aFVzZXInKVxuICAgIHNldFVzZXIoSlNPTi5wYXJzZShzdG9yYWdlVXNlcikpXG5cbiAgICBjb25zdCB7ICdAbmV4dGF1dGgudG9rZW4nOiB0b2tlbn0gID0gcGFyc2VDb29raWVzKCk7XG4gICAgY29uc29sZS5sb2coJ01ldSBUb2tlbi4uLicsdG9rZW4pXG4gIH0gXG5cbiAgdXNlRWZmZWN0KCgpPT57ICAgXG5cbiAgICBsb2FkU3RvcmFnZSgpO1xuICBcbiAgfSxbXSlcblxuXG4gIC8vY29uc29sZS5sb2coXCJDSEFNT1UgTUVVIENPTlRFWFRPXCIpXG4gIFxuXG4gYXN5bmMgZnVuY3Rpb24gU2lnbkluKHsgZW1haWwsIHBhc3N3b3JkfSl7XG4gICBzZXRMb2FkKHRydWUpXG4gICB2YXIgZGF0YVxuICAgZGF0YSA9ICB7XG4gICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgfVxuICBhd2FpdCBheGlvcy5wb3N0KCdodHRwczovL2FwcC1mYWNpbC0xY2M0ZWZjNDFjZGMuaGVyb2t1YXBwLmNvbS91c2VyL2xvZ2luLycsIGRhdGEpXG4gICAudGhlbiggZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdDQUlVIE5PUyAyMDAgTE9HSU4nLCByZXNwb25zZS5kYXRhLnVzZXIpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnQEF1dGhVc2VyJywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YS51c2VyKSlcblxuICAgICAgICBjb25zdCB1c3VhcmlvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0BBdXRoVXNlcicpXG4gICAgICAgLy8gY29uc29sZS5sb2coJ1JFU1VMVCBMT0dJTicsIHVzZXJTdG9yYWdlKVxuICAgICAgICBzZXRVc2VyKEpTT04ucGFyc2UodXN1YXJpbykpXG4gICAgICAgIHRvYXN0LnN1Y2Nlc3MoJ0xvZ2FkbyBjb20gc3VjZXNzbyEnKVxuXG4gICAgICAgIGNvbnN0IHt0b2tlbn0gPSByZXNwb25zZS5kYXRhXG4gICAgICAgIHNldENvb2tpZSh1bmRlZmluZWQsJ0BuZXh0YXV0aC50b2tlbicsIHRva2VuLCB7XG4gICAgICAgICAgbWF4QWdlOiA2MCAqIDYwICogMjQgKiAzMCwgLy8gZXhwaXJhciBlbSAxIG1lc1xuICAgICAgICAgIHBhdGg6IFwiL1wiIC8vIHF1YWlzIGNhbWluaG9zIHRlcmFvIGFjZXNzbyBhbyBjb29raWVzXG4gICAgICAgIH0pXG4gICAgICAgIC8vUm91dGVyLnB1c2goJy9Ib21lJylcbiAgICAgICAgUm91dGVyLnB1c2goJy9DZW50cm9DdXN0by9PcmRlbUNvbXByYScpXG4gICAgICB9XG4gICAgICBzZXRMb2FkKGZhbHNlKVxuICAgfSlcbiAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgdG9hc3QuZXJyb3IoJ1ZlcmlmaXF1ZSBvcyBjYW1wb3MgZGlnaXRhZG9zIScpXG4gICAgIGNvbnNvbGUubG9nKCdFUlJPIEFPIExPR0FSJyxlcnJvcik7XG4gICAgIHNldExvYWQoZmFsc2UpXG4gICB9KVxuXG4gfVxuXG4gIHJldHVybihcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3t1c2VyLGxvYWQsIFNpZ25Jbiwgc2lnbk91dH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gIClcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidG9hc3QiLCJkZXN0cm95Q29va2llIiwic2V0Q29va2llIiwicGFyc2VDb29raWVzIiwiUm91dGVyIiwiYXhpb3MiLCJBdXRoQ29udGV4dCIsInNpZ25PdXQiLCJ1bmRlZmluZWQiLCJwYXRoIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJwYXRobmFtZSIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkIiwic2V0TG9hZCIsImxvYWRTdG9yYWdlIiwic3RvcmFnZVVzZXIiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwidG9rZW4iLCJTaWduSW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiZGF0YSIsInBvc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwidXN1YXJpbyIsInN1Y2Nlc3MiLCJtYXhBZ2UiLCJjYXRjaCIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.js\n");

/***/ }),

/***/ "./src/pages/_app.page.js":
/*!********************************!*\
  !*** ./src/pages/_app.page.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_3__]);\n([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\nvar _jsxFileName = \"/Users/igormaciel/Desktop/Projetos/facil-reactjs/src/pages/_app.page.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {\n      autoClose: 3000\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 9,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5wYWdlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFTRyxLQUFULENBQWU7QUFBRUMsRUFBQUEsU0FBRjtBQUFhQyxFQUFBQTtBQUFiLENBQWYsRUFBeUM7QUFDdkMsc0JBQ0UsOERBQUMsK0RBQUQ7QUFBQSw0QkFDRSw4REFBQyxTQUFELG9CQUFlQSxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQUVFLDhEQUFDLDBEQUFEO0FBQWdCLGVBQVMsRUFBRTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRDs7QUFFRCxpRUFBZUYsS0FBZixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmFyaXJpLWFwcC8uL3NyYy9wYWdlcy9fYXBwLnBhZ2UuanM/MmJjYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcbmltcG9ydCAncmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzcyc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8VG9hc3RDb250YWluZXIgYXV0b0Nsb3NlPXszMDAwfSAvPlxuICAgIDwvQXV0aFByb3ZpZGVyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJBdXRoUHJvdmlkZXIiLCJUb2FzdENvbnRhaW5lciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.page.js\n");

/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("nookies");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.page.js"));
module.exports = __webpack_exports__;

})();