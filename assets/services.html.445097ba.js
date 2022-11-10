import{_ as o,r as p,o as t,c,b as n,d as s,e as a,w as l,a as r}from"./app.33ffcc50.js";const i={},D=n("h1",{id:"services",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#services","aria-hidden":"true"},"#"),s(" Services")],-1),d=n("p",null,[s("Instead, Coalesce allows you to generate API Controllers and a TypeScript client from a service. A service, in this case, is nothing more than a C# class or an interface with methods on it, annotated with "),n("code",null,"[Coalesce,Service]"),s(". An implementation of this class or interface must be injectable from your application's service container, so a registration in Startup.cs is needed.")],-1),y=n("h2",{id:"generated-code",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#generated-code","aria-hidden":"true"},"#"),s(" Generated Code")],-1),u=n("p",null,"For each external type found in your application's model, Coalesce will generate:",-1),v=n("li",null,"An API controller with endpoints that correspond to the service's instance methods.",-1),h=r(`<h2 id="example-service" tabindex="-1"><a class="header-anchor" href="#example-service" aria-hidden="true">#</a> Example Service</h2><p>An example of a service might look something like this:</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">[</span><span style="color:#4EC9B0;">Coalesce</span><span style="color:#D4D4D4;">, </span><span style="color:#4EC9B0;">Service</span><span style="color:#D4D4D4;">]</span></span>
<span class="line"><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">interface</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">IWeatherService</span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#4EC9B0;">WeatherData</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">GetWeather</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">zipCode</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With an implementation:</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">WeatherService</span><span style="color:#D4D4D4;"> : </span><span style="color:#4EC9B0;">IWeatherService</span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">WeatherService</span><span style="color:#D4D4D4;">(</span><span style="color:#4EC9B0;">AppDbContext</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">db</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">this</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">db</span><span style="color:#D4D4D4;"> = </span><span style="color:#9CDCFE;">db</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">WeatherData</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">GetWeather</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">zipCode</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#6A9955;">// Assuming some magic HttpGet method that works as follows...</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">response</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">HttpGet</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&quot;http://www.example.com/api/weather/&quot;</span><span style="color:#D4D4D4;"> + </span><span style="color:#9CDCFE;">zipCode</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">response</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">Body</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">SerializeTo</span><span style="color:#D4D4D4;">&lt;</span><span style="color:#4EC9B0;">WeatherData</span><span style="color:#D4D4D4;">&gt;();</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">void</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">MethodThatIsNotExposedBecauseItIsNotOnTheExposedInterface</span><span style="color:#D4D4D4;">() {  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And a registration:</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Startup</span><span style="color:#D4D4D4;"> </span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">void</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">ConfigureServices</span><span style="color:#D4D4D4;">(</span><span style="color:#4EC9B0;">IServiceCollection</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">services</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#9CDCFE;">services</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">AddCoalesce</span><span style="color:#D4D4D4;">&lt;</span><span style="color:#4EC9B0;">AppDbContext</span><span style="color:#D4D4D4;">&gt;();</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#9CDCFE;">services</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">AddScoped</span><span style="color:#D4D4D4;">&lt;</span><span style="color:#4EC9B0;">IWeatherService</span><span style="color:#D4D4D4;">, </span><span style="color:#4EC9B0;">WeatherService</span><span style="color:#D4D4D4;">&gt;();</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>While it isn&#39;t required that an interface for your service exist - you can generate directly from the implementation, it is highly recommended that an interface be used. Interfaces increase testability and reduce risk of accidentally changing the signature of a published API, among other benefits.</p>`,8);function m(C,b){const e=p("RouterLink");return t(),c("div",null,[D,n("p",null,[s("In a Coalesce, you are fairly likely to end up with a need for some API endpoints that aren't closely tied with your regular data model. While you could stick static "),a(e,{to:"/modeling/model-components/methods.html"},{default:l(()=>[s("Methods")]),_:1}),s(" on one of your entities, this solution just leads to a jumbled mess of functionality all over your data model that doesn't belong there.")]),d,n("p",null,[s("The instance methods of these services work just like other custom "),a(e,{to:"/modeling/model-components/methods.html"},{default:l(()=>[s("Methods")]),_:1}),s(" in Coalesce, with one notable distinction: Instance methods don't operate on an instance of a model, but instead on a dependency injected instance of the service.")]),y,u,n("ul",null,[v,n("li",null,[s("A TypeScript client containing the members outlined in "),a(e,{to:"/modeling/model-components/methods.html"},{default:l(()=>[s("Methods")]),_:1}),s(" for invoking these endpoints.")])]),h])}const E=o(i,[["render",m],["__file","services.html.vue"]]);export{E as default};
