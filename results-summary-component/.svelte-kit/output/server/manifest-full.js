export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["data.json","robots.txt"]),
	mimeTypes: {".json":"application/json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.VsM038v4.js",app:"_app/immutable/entry/app.bwMF_Pp5.js",imports:["_app/immutable/entry/start.VsM038v4.js","_app/immutable/chunks/yMMlFi7T.js","_app/immutable/chunks/D3jqVr43.js","_app/immutable/chunks/Bqxs3c2K.js","_app/immutable/entry/app.bwMF_Pp5.js","_app/immutable/chunks/Bqxs3c2K.js","_app/immutable/chunks/D3jqVr43.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/6XYss_Sz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
