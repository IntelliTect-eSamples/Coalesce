import{_ as r,r as l,o as c,c as i,b as e,d as s,e as n,w as p,a as o}from"./app.33ffcc50.js";const d={},D=e("h1",{id:"execute",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#execute","aria-hidden":"true"},"#"),s(" [Execute]")],-1),u=e("p",null,"Controls permissions for executing of a static or instance method through the API.",-1),h=o(`<h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage" aria-hidden="true">#</a> Example Usage</h2><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Person</span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">int</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">PersonId</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span></span>
<span class="line"><span style="color:#D4D4D4;">    [</span><span style="color:#4EC9B0;">Coalesce</span><span style="color:#D4D4D4;">, </span><span style="color:#4EC9B0;">Execute</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">Roles</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&quot;Payroll,HR&quot;</span><span style="color:#D4D4D4;">)]</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">void</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">GiveRaise</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">int</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">centsPerHour</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">        ...</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    ...</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h2>`,3),y=e("p",null,"A comma-separated list of roles which are allowed to execute the method.",-1),m=o("<p>The level of access to allow for the action for the method.</p><p>Enum values are:</p><ul><li><code>SecurityPermissionLevels.AllowAll</code> Allow all users to perform the action for the attribute, including users who are not authenticated at all.</li><li><code>SecurityPermissionLevels.AllowAuthorized</code> Allow only users who are members of the roles specified on the attribute to perform the action. If no roles are specified on the attribute, then all authenticated users are allowed (no anonymous access).</li><li><code>SecurityPermissionLevels.DenyAll</code> Deny the action to all users, regardless of authentication status or authorization level. If <code>DenyAll</code> is used, no API endpoint for the action will be generated.</li></ul>",3);function v(b,f){const t=l("RouterLink"),a=l("Prop");return c(),i("div",null,[D,u,e("p",null,[s("For other security controls, see "),n(t,{to:"/modeling/model-components/attributes/security-attribute.html"},{default:p(()=>[s("Security Attributes")]),_:1}),s(".")]),h,n(a,{def:"public string Roles { get; set; }"}),y,n(a,{def:"public SecurityPermissionLevels PermissionLevel { get; set; } = SecurityPermissionLevels.AllowAuthorized;"}),m])}const C=r(d,[["render",v],["__file","execute.html.vue"]]);export{C as default};
