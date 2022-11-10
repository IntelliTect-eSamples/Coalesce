import{_ as c,r as l,o as i,c as d,f as t,b as n,d as s,e,w as o,a as D}from"./app.33ffcc50.js";const y={},m=n("h1",{id:"c-admin-editor-page",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#c-admin-editor-page","aria-hidden":"true"},"#"),s(" c-admin-editor-page")],-1),u={href:"https://router.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},v=D(`<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// router.ts or main.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// WITHOUT Vuetify A la carte:</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">CAdminEditorPage</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;coalesce-vue-vuetify&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#6A9955;">// WITH Vuetify A-la-carte:</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">CAdminEditorPage</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;coalesce-vue-vuetify/lib&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">router</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">new</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">Router</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// ...</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">routes:</span><span style="color:#D4D4D4;"> [</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#6A9955;">// ... other routes</span></span>
<span class="line"><span style="color:#D4D4D4;">        {</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">path:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;/admin/:type/edit/:id?&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">name:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;coalesce-admin-item&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">component:</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">CAdminEditorPage</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">props:</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">true</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">        },</span></span>
<span class="line"><span style="color:#D4D4D4;">    ]</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2>`,3),h=n("p",null,"The PascalCase name of the type to be created/edited.",-1),C=n("p",null,[s("The primary key of the item being edited. If null or not provided, the page will be creating a new instance of the provided "),n("code",null,"type"),s(" instead.")],-1);function b(f,_){const a=l("RouterLink"),r=l("ExternalLinkIcon"),p=l("Prop");return i(),d("div",null,[m,t(" MARKER:summary "),n("p",null,[s("A page for a creating/editing single "),e(a,{to:"/stacks/vue/layers/viewmodels.html"},{default:o(()=>[s("ViewModel")]),_:1}),s(" instance. Provides a "),e(a,{to:"/stacks/vue/coalesce-vue-vuetify/components/c-admin-editor.html"},{default:o(()=>[s("c-admin-editor")]),_:1}),s(" and a "),e(a,{to:"/stacks/vue/coalesce-vue-vuetify/components/c-admin-methods.html"},{default:o(()=>[s("c-admin-methods")]),_:1}),s(" for the instance. Designed to be routed to directly with "),n("a",u,[s("vue-router"),e(r)]),s(".")]),t(" MARKER:summary-end "),v,e(p,{def:"type: string",lang:"ts"}),h,e(p,{def:"id?: number | string",lang:"ts"}),C])}const E=c(y,[["render",b],["__file","c-admin-editor-page.html.vue"]]);export{E as default};
