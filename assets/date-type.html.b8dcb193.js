import{_ as n,r as l,o as t,c as p,e as o,d as s,a as r,b as e}from"./app.33ffcc50.js";const c={},D=r(`<h1 id="datetype" tabindex="-1"><a class="header-anchor" href="#datetype" aria-hidden="true">#</a> [DateType]</h1><p>Specifies whether a DateTime type will have a date and a time, or only a date.</p><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage" aria-hidden="true">#</a> Example Usage</h2><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Person</span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">int</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">PersonId</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    [</span><span style="color:#4EC9B0;">DateType</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">DateTypeAttribute</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">DateTypes</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">DateOnly</span><span style="color:#D4D4D4;">)]</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">DateTimeOffset</span><span style="color:#D4D4D4;">? </span><span style="color:#9CDCFE;">BirthDate</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h2>`,5),i=e("p",null,"The type of date the property represents.",-1),d=e("p",null,"Enum values are:",-1),y=e("ul",null,[e("li",null,[e("code",null,"DateTypeAttribute.DateTypes.DateTime"),s(" Subject is both a date and time.")]),e("li",null,[e("code",null,"DateTypeAttribute.DateTypes.DateOnly"),s(" Subject is only a date with no significant time component.")])],-1);function u(h,m){const a=l("Prop");return t(),p("div",null,[D,o(a,{def:"public DateTypes DateType { get; set; } = DateTypes.DateTime; ",ctor:"1"}),s(),i,d,y])}const v=n(c,[["render",u],["__file","date-type.html.vue"]]);export{v as default};
