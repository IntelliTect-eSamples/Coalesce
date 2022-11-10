import{_ as r,r as o,o as i,c as d,f as p,b as n,d as s,e as a,w as l,a as D}from"./app.33ffcc50.js";const m={},y=n("h1",{id:"c-admin-table-page",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#c-admin-table-page","aria-hidden":"true"},"#"),s(" c-admin-table-page")],-1),u={href:"https://router.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},v=D(`<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// router.ts or main.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// WITHOUT Vuetify A la carte:</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">CAdminTablePage</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;coalesce-vue-vuetify&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#6A9955;">// WITH Vuetify A-la-carte:</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">CAdminTablePage</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;coalesce-vue-vuetify/lib&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">router</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">new</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">Router</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// ...</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">routes:</span><span style="color:#D4D4D4;"> [</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#6A9955;">// ... other routes</span></span>
<span class="line"><span style="color:#D4D4D4;">        {</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">path:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;/admin/:type&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">name:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;coalesce-admin-list&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">component:</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">CAdminTablePage</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#9CDCFE;">props:</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">true</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">        },</span></span>
<span class="line"><span style="color:#D4D4D4;">    ]</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2>`,3),h=n("p",null,"The PascalCase name of the type to be listed.",-1);function b(C,f){const e=o("RouterLink"),c=o("ExternalLinkIcon"),t=o("Prop");return i(),d("div",null,[y,p(" MARKER:summary "),n("p",null,[s("A full-featured page for interacting with a "),a(e,{to:"/stacks/vue/layers/viewmodels.html"},{default:l(()=>[s("ListViewModel")]),_:1}),s(". Provides a "),a(e,{to:"/stacks/vue/coalesce-vue-vuetify/components/c-admin-table.html"},{default:l(()=>[s("c-admin-table")]),_:1}),s(" and a "),a(e,{to:"/stacks/vue/coalesce-vue-vuetify/components/c-admin-methods.html"},{default:l(()=>[s("c-admin-methods")]),_:1}),s(" for the list. Designed to be routed to directly with "),n("a",u,[s("vue-router"),a(c)]),s(".")]),p(" MARKER:summary-end "),v,a(t,{def:"type: string",lang:"ts"}),h,a(t,{def:"list?: ListViewModel",lang:"ts"}),n("p",null,[s("An optional "),a(e,{to:"/stacks/vue/layers/viewmodels.html"},{default:l(()=>[s("ListViewModel")]),_:1}),s(" that will be used if provided instead of the one the component will otherwise create automatically.")])])}const E=r(m,[["render",b],["__file","c-admin-table-page.html.vue"]]);export{E as default};
