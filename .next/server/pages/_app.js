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
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider),\n/* harmony export */   \"signOut\": () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _services_apiClient__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/apiClient */ \"./src/services/apiClient.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_1__, _services_apiClient__WEBPACK_IMPORTED_MODULE_5__]);\n([react_toastify__WEBPACK_IMPORTED_MODULE_1__, _services_apiClient__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\nvar _jsxFileName = \"/Users/igormaciel/Desktop/Projetos/facil-reactjs/src/contexts/AuthContext.js\";\n\n\n\n\n\n //import { getSortedRoutes } from 'next/dist/shared/lib/router/utils';\n\n\nconst AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();\nfunction signOut() {\n  try {\n    (0,nookies__WEBPACK_IMPORTED_MODULE_2__.destroyCookie)(undefined, '@facil.token', {\n      path: '/'\n    });\n    next_router__WEBPACK_IMPORTED_MODULE_3___default().push('/');\n    console.log('Minha Rota', (next_router__WEBPACK_IMPORTED_MODULE_3___default().pathname));\n    console.log('Caiu no Try SignOut');\n  } catch {\n    console.log(\"Erro ao deslogar\");\n  }\n}\nfunction AuthProvider({\n  children\n}) {\n  const {\n    0: user,\n    1: setUser\n  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const {\n    0: load,\n    1: setLoad\n  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); //const router = useRouter()\n  // function loadStorage() {\n  //   const storageUser = localStorage.getItem('@AuthUser')\n  //   setUser(JSON.parse(storageUser))\n  //   const { '@facil.token': token } = parseCookies();\n  //   console.log('Meu Token...', token)\n  // }\n  // useEffect(() => {\n  //   const { '@facil.token': token } = parseCookies();\n  //   if(token){\n  //   }\n  //   //loadStorage();\n  // }, [])\n\n  async function SignIn({\n    email,\n    password\n  }) {\n    try {\n      console.log(\"caiu no try login\");\n      const response = await _services_apiClient__WEBPACK_IMPORTED_MODULE_5__.api.post(\"/session\", {\n        email,\n        password\n      });\n      console.log(\"meu data login\", response.data);\n      const {\n        token\n      } = response.data;\n      (0,nookies__WEBPACK_IMPORTED_MODULE_2__.setCookie)(undefined, '@facil.token', token, {\n        maxAge: 60 * 60 * 24 * 30,\n        // expirar em 1 mes\n        path: \"/\" // todos os caminhos terao acesso ao cookies\n\n      });\n      setUser(response.data);\n      _services_apiClient__WEBPACK_IMPORTED_MODULE_5__.api.defaults.headers.common.Authorization = `Bearer ${token}`; // a api utilizara nosso token\n      // Router.push('/CentroCusto/OrdemCompra')\n\n      next_router__WEBPACK_IMPORTED_MODULE_3___default().push('/Ateste'); // toast.success('Logado com sucesso!')\n    } catch (err) {\n      console.log(\"Erro ao logar\", err);\n    }\n  }\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(AuthContext.Provider, {\n    value: {\n      user,\n      load,\n      SignIn,\n      signOut\n    },\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 81,\n    columnNumber: 5\n  }, this);\n} // async function SignIn({ email, password}){\n//   setLoad(true)\n//   var data\n//   data =  {\n//     email: email,\n//     password: password,\n//   }\n//  await axios.post('http://localhost:3333/session', data)\n//   .then( function(response) {\n//      if (response.status === 200) {\n//        //console.log('CAIU NOS 200 LOGIN', response.data.user);\n//        localStorage.setItem('@AuthUser', JSON.stringify(response.data.user))\n//        const usuario = localStorage.getItem('@AuthUser')\n//       // console.log('RESULT LOGIN', userStorage)\n//        setUser(JSON.parse(usuario))\n//        toast.success('Logado com sucesso!')\n//        const {token} = response.data\n//        setCookie(undefined,'@facil.token', token, {\n//          maxAge: 60 * 60 * 24 * 30, // expirar em 1 mes\n//          path: \"/\" // quais caminhos terao acesso ao cookies\n//        })\n//        //Router.push('/Home')\n//        Router.push('/CentroCusto/OrdemCompra')\n//      }\n//      setLoad(false)\n//   })\n//   .catch(function(error){\n//    toast.error('Verifique os campos digitados!')\n//     console.log('ERRO AO LOGAR',error);\n//     setLoad(false)\n//   })\n// }\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUVBLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXJpcmktYXBwLy4vc3JjL2NvbnRleHRzL0F1dGhDb250ZXh0LmpzPzc4NzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAncmVhY3QtdG9hc3RpZnknO1xuaW1wb3J0IHsgZGVzdHJveUNvb2tpZSwgc2V0Q29va2llLCBwYXJzZUNvb2tpZXMgfSBmcm9tICdub29raWVzJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IGFwaSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaUNsaWVudCc7XG5cblxuLy9pbXBvcnQgeyBnZXRTb3J0ZWRSb3V0ZXMgfSBmcm9tICduZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduT3V0KCkge1xuICB0cnkge1xuICAgIGRlc3Ryb3lDb29raWUodW5kZWZpbmVkLCAnQGZhY2lsLnRva2VuJywgeyBwYXRoOiAnLycgfSk7XG4gICAgUm91dGVyLnB1c2goJy8nKVxuICAgIGNvbnNvbGUubG9nKCdNaW5oYSBSb3RhJywgUm91dGVyLnBhdGhuYW1lKVxuICAgIGNvbnNvbGUubG9nKCdDYWl1IG5vIFRyeSBTaWduT3V0JylcbiAgfSBjYXRjaCB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvIGFvIGRlc2xvZ2FyXCIpXG4gIH1cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG5cbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUoe30pXG4gIGNvbnN0IFtsb2FkLCBzZXRMb2FkXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAvL2NvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cblxuICAvLyBmdW5jdGlvbiBsb2FkU3RvcmFnZSgpIHtcbiAgLy8gICBjb25zdCBzdG9yYWdlVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdAQXV0aFVzZXInKVxuICAvLyAgIHNldFVzZXIoSlNPTi5wYXJzZShzdG9yYWdlVXNlcikpXG5cbiAgLy8gICBjb25zdCB7ICdAZmFjaWwudG9rZW4nOiB0b2tlbiB9ID0gcGFyc2VDb29raWVzKCk7XG4gIC8vICAgY29uc29sZS5sb2coJ01ldSBUb2tlbi4uLicsIHRva2VuKVxuICAvLyB9XG5cbiAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gICBjb25zdCB7ICdAZmFjaWwudG9rZW4nOiB0b2tlbiB9ID0gcGFyc2VDb29raWVzKCk7XG4gIC8vICAgaWYodG9rZW4pe1xuICAvLyAgIH1cbiAgLy8gICAvL2xvYWRTdG9yYWdlKCk7XG5cbiAgLy8gfSwgW10pXG5cblxuICBhc3luYyBmdW5jdGlvbiBTaWduSW4oeyBlbWFpbCwgcGFzc3dvcmQgfSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNhaXUgbm8gdHJ5IGxvZ2luXCIpXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL3Nlc3Npb25cIiwge1xuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJtZXUgZGF0YSBsb2dpblwiLCByZXNwb25zZS5kYXRhKVxuXG4gICAgICBjb25zdCB7IHRva2VuIH0gPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICBzZXRDb29raWUodW5kZWZpbmVkLCAnQGZhY2lsLnRva2VuJywgdG9rZW4sIHtcbiAgICAgICAgbWF4QWdlOiA2MCAqIDYwICogMjQgKiAzMCwgLy8gZXhwaXJhciBlbSAxIG1lc1xuICAgICAgICBwYXRoOiBcIi9cIiAvLyB0b2RvcyBvcyBjYW1pbmhvcyB0ZXJhbyBhY2Vzc28gYW8gY29va2llc1xuICAgICAgfSlcblxuICAgICAgc2V0VXNlcihyZXNwb25zZS5kYXRhKVxuXG4gICAgICBhcGkuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gIC8vIGEgYXBpIHV0aWxpemFyYSBub3NzbyB0b2tlblxuICAgICAgLy8gUm91dGVyLnB1c2goJy9DZW50cm9DdXN0by9PcmRlbUNvbXByYScpXG5cbiAgICAgIFJvdXRlci5wdXNoKCcvQXRlc3RlJylcblxuICAgICAgLy8gdG9hc3Quc3VjY2VzcygnTG9nYWRvIGNvbSBzdWNlc3NvIScpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm8gYW8gbG9nYXJcIiwgZXJyKVxuXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgbG9hZCwgU2lnbkluLCBzaWduT3V0IH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gIClcbn1cblxuXG5cblxuXG4vLyBhc3luYyBmdW5jdGlvbiBTaWduSW4oeyBlbWFpbCwgcGFzc3dvcmR9KXtcbi8vICAgc2V0TG9hZCh0cnVlKVxuLy8gICB2YXIgZGF0YVxuLy8gICBkYXRhID0gIHtcbi8vICAgICBlbWFpbDogZW1haWwsXG4vLyAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuLy8gICB9XG4vLyAgYXdhaXQgYXhpb3MucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMzMzL3Nlc3Npb24nLCBkYXRhKVxuLy8gICAudGhlbiggZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4vLyAgICAgICAgLy9jb25zb2xlLmxvZygnQ0FJVSBOT1MgMjAwIExPR0lOJywgcmVzcG9uc2UuZGF0YS51c2VyKTtcbi8vICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnQEF1dGhVc2VyJywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YS51c2VyKSlcblxuLy8gICAgICAgIGNvbnN0IHVzdWFyaW8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQEF1dGhVc2VyJylcbi8vICAgICAgIC8vIGNvbnNvbGUubG9nKCdSRVNVTFQgTE9HSU4nLCB1c2VyU3RvcmFnZSlcbi8vICAgICAgICBzZXRVc2VyKEpTT04ucGFyc2UodXN1YXJpbykpXG4vLyAgICAgICAgdG9hc3Quc3VjY2VzcygnTG9nYWRvIGNvbSBzdWNlc3NvIScpXG5cbi8vICAgICAgICBjb25zdCB7dG9rZW59ID0gcmVzcG9uc2UuZGF0YVxuLy8gICAgICAgIHNldENvb2tpZSh1bmRlZmluZWQsJ0BmYWNpbC50b2tlbicsIHRva2VuLCB7XG4vLyAgICAgICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDMwLCAvLyBleHBpcmFyIGVtIDEgbWVzXG4vLyAgICAgICAgICBwYXRoOiBcIi9cIiAvLyBxdWFpcyBjYW1pbmhvcyB0ZXJhbyBhY2Vzc28gYW8gY29va2llc1xuLy8gICAgICAgIH0pXG4vLyAgICAgICAgLy9Sb3V0ZXIucHVzaCgnL0hvbWUnKVxuLy8gICAgICAgIFJvdXRlci5wdXNoKCcvQ2VudHJvQ3VzdG8vT3JkZW1Db21wcmEnKVxuLy8gICAgICB9XG4vLyAgICAgIHNldExvYWQoZmFsc2UpXG4vLyAgIH0pXG4vLyAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4vLyAgICB0b2FzdC5lcnJvcignVmVyaWZpcXVlIG9zIGNhbXBvcyBkaWdpdGFkb3MhJylcbi8vICAgICBjb25zb2xlLmxvZygnRVJSTyBBTyBMT0dBUicsZXJyb3IpO1xuLy8gICAgIHNldExvYWQoZmFsc2UpXG4vLyAgIH0pXG5cbi8vIH0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidG9hc3QiLCJkZXN0cm95Q29va2llIiwic2V0Q29va2llIiwicGFyc2VDb29raWVzIiwiUm91dGVyIiwiYXhpb3MiLCJhcGkiLCJBdXRoQ29udGV4dCIsInNpZ25PdXQiLCJ1bmRlZmluZWQiLCJwYXRoIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJwYXRobmFtZSIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkIiwic2V0TG9hZCIsIlNpZ25JbiIsImVtYWlsIiwicGFzc3dvcmQiLCJyZXNwb25zZSIsInBvc3QiLCJkYXRhIiwidG9rZW4iLCJtYXhBZ2UiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJlcnIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.js\n");

/***/ }),

/***/ "./src/pages/_app.page.js":
/*!********************************!*\
  !*** ./src/pages/_app.page.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_3__]);\n([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\nvar _jsxFileName = \"/Users/igormaciel/Desktop/Projetos/facil-reactjs/src/pages/_app.page.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {\n      autoClose: 3000\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 9,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5wYWdlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFTRyxLQUFULENBQWU7QUFBRUMsRUFBQUEsU0FBRjtBQUFhQyxFQUFBQTtBQUFiLENBQWYsRUFBeUM7QUFDdkMsc0JBQ0UsOERBQUMsK0RBQUQ7QUFBQSw0QkFDRSw4REFBQyxTQUFELG9CQUFlQSxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQUVFLDhEQUFDLDBEQUFEO0FBQWdCLGVBQVMsRUFBRTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRDs7QUFFRCxpRUFBZUYsS0FBZixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmFyaXJpLWFwcC8uL3NyYy9wYWdlcy9fYXBwLnBhZ2UuanM/MmJjYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgJy4uLy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcbmltcG9ydCAncmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzcyc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8VG9hc3RDb250YWluZXIgYXV0b0Nsb3NlPXszMDAwfSAvPlxuICAgIDwvQXV0aFByb3ZpZGVyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJBdXRoUHJvdmlkZXIiLCJUb2FzdENvbnRhaW5lciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.page.js\n");

/***/ }),

/***/ "./src/services/api.js":
/*!*****************************!*\
  !*** ./src/services/api.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setupAPIClient\": () => (/* binding */ setupAPIClient)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__]);\n_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nfunction setupAPIClient(ctx = undefined) {\n  const cookies = (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)(ctx);\n  const api = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n    baseURL: \"http://localhost:3333\",\n    headers: {\n      Authorization: `Bearer ${cookies['@facil.token']}`\n    }\n  });\n  api.interceptors.response.use(response => {\n    console.log(response);\n    return response;\n  }, error => {\n    if (error.response.status === 401) {\n      console.log(error.response.status);\n\n      if (true) {\n        // deslogar o usuario\n        (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.signOut)();\n      } else {}\n    }\n\n    return Promise.reject(error);\n  });\n  return api;\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVPLFNBQVNJLGNBQVQsQ0FBd0JDLEdBQUcsR0FBR0MsU0FBOUIsRUFBeUM7QUFFOUMsUUFBTUMsT0FBTyxHQUFHTCxxREFBWSxDQUFDRyxHQUFELENBQTVCO0FBQ0EsUUFBTUcsR0FBRyxHQUFHUixtREFBQSxDQUFhO0FBQ3ZCVSxJQUFBQSxPQUFPLEVBQUVDLHVCQURjO0FBRXZCRyxJQUFBQSxPQUFPLEVBQUU7QUFDUEMsTUFBQUEsYUFBYSxFQUFHLFVBQVNSLE9BQU8sQ0FBQyxjQUFELENBQWlCO0FBRDFDO0FBRmMsR0FBYixDQUFaO0FBT0FDLEVBQUFBLEdBQUcsQ0FBQ1EsWUFBSixDQUFpQkMsUUFBakIsQ0FBMEJDLEdBQTFCLENBQStCRCxRQUFELElBQWM7QUFDMUNFLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSCxRQUFaO0FBQ0EsV0FBT0EsUUFBUDtBQUNELEdBSEQsRUFHSUksS0FBRCxJQUFXO0FBQ1osUUFBSUEsS0FBSyxDQUFDSixRQUFOLENBQWVLLE1BQWYsS0FBMEIsR0FBOUIsRUFBbUM7QUFDakNILE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxLQUFLLENBQUNKLFFBQU4sQ0FBZUssTUFBM0I7O0FBQ0EsZ0JBQW1DO0FBQ2pDO0FBQ0FuQixRQUFBQSw4REFBTztBQUVSLE9BSkQsTUFJTyxFQUVOO0FBQ0Y7O0FBRUQsV0FBT29CLE9BQU8sQ0FBQ0MsTUFBUixDQUFlSCxLQUFmLENBQVA7QUFFRCxHQWpCRDtBQWtCQSxTQUFPYixHQUFQO0FBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhcmlyaS1hcHAvLi9zcmMvc2VydmljZXMvYXBpLmpzPzRjOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zLCB7IEF4aW9zRXJyb3IgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IHBhcnNlQ29va2llcyB9IGZyb20gXCJub29raWVzXCI7XG5pbXBvcnQgeyBzaWduT3V0IH0gZnJvbSBcIi4uL2NvbnRleHRzL0F1dGhDb250ZXh0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEFQSUNsaWVudChjdHggPSB1bmRlZmluZWQpIHtcblxuICBjb25zdCBjb29raWVzID0gcGFyc2VDb29raWVzKGN0eCk7XG4gIGNvbnN0IGFwaSA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y29va2llc1snQGZhY2lsLnRva2VuJ119YFxuICAgIH1cbiAgfSk7XG5cbiAgYXBpLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoKHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvci5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGRlc2xvZ2FyIG8gdXN1YXJpb1xuICAgICAgICBzaWduT3V0KCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1VuYXV0aG9yaXplZCwgZXJyb3Igd2l0aCBhdXRoZW50aWNhdGlvbiB0b2tlbicpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuXG4gIH0pO1xuICByZXR1cm4gYXBpO1xufSJdLCJuYW1lcyI6WyJheGlvcyIsIkF4aW9zRXJyb3IiLCJwYXJzZUNvb2tpZXMiLCJzaWduT3V0Iiwic2V0dXBBUElDbGllbnQiLCJjdHgiLCJ1bmRlZmluZWQiLCJjb29raWVzIiwiYXBpIiwiY3JlYXRlIiwiYmFzZVVSTCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJpbnRlcmNlcHRvcnMiLCJyZXNwb25zZSIsInVzZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInN0YXR1cyIsIlByb21pc2UiLCJyZWplY3QiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/services/api.js\n");

/***/ }),

/***/ "./src/services/apiClient.js":
/*!***********************************!*\
  !*** ./src/services/apiClient.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/services/api.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api__WEBPACK_IMPORTED_MODULE_0__]);\n_api__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst api = (0,_api__WEBPACK_IMPORTED_MODULE_0__.setupAPIClient)();\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpQ2xpZW50LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFFTyxNQUFNQyxHQUFHLEdBQUdELG9EQUFjLEVBQTFCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXJpcmktYXBwLy4vc3JjL3NlcnZpY2VzL2FwaUNsaWVudC5qcz9jZmNlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldHVwQVBJQ2xpZW50IH0gZnJvbSBcIi4vYXBpXCI7XG5cbmV4cG9ydCBjb25zdCBhcGkgPSBzZXR1cEFQSUNsaWVudCgpOyJdLCJuYW1lcyI6WyJzZXR1cEFQSUNsaWVudCIsImFwaSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/services/apiClient.js\n");

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