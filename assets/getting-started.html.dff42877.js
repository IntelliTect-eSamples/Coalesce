import{_ as r,r as p,o as c,c as i,b as e,e as n,d as s,w as l,a as t}from"./app.33ffcc50.js";const D={},d=t(`<h1 id="getting-started-with-vue" tabindex="-1"><a class="header-anchor" href="#getting-started-with-vue" aria-hidden="true">#</a> Getting Started with Vue</h1><h2 id="creating-a-project" tabindex="-1"><a class="header-anchor" href="#creating-a-project" aria-hidden="true">#</a> Creating a Project</h2><p>The quickest and easiest way to create a new Coalesce Vue application is to use the <code>dotnet new</code> template. In your favorite shell:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">mkdir MyCompany.MyProject</span></span>
<span class="line"><span style="color:#DCDCAA;">cd</span><span style="color:#D4D4D4;"> MyCompany.MyProject</span></span>
<span class="line"><span style="color:#D4D4D4;">dotnet new --install IntelliTect.Coalesce.Vue.Template</span></span>
<span class="line"><span style="color:#D4D4D4;">dotnet new coalescevue</span></span>
<span class="line"><span style="color:#DCDCAA;">cd</span><span style="color:#D4D4D4;"> *.Web</span></span>
<span class="line"><span style="color:#D4D4D4;">npm ci</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),y={href:"https://www.nuget.org/packages/IntelliTect.Coalesce.Vue.Template/",target:"_blank",rel:"noopener noreferrer"},u=e("img",{src:"https://img.shields.io/nuget/v/IntelliTect.Coalesce.Vue.Template",alt:""},null,-1),h={href:"https://github.com/IntelliTect/Coalesce.Vue.Template",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"project-structure",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#project-structure","aria-hidden":"true"},"#"),s(" Project Structure")],-1),v={class:"custom-container tip"},C=e("p",{class:"custom-container-title"},"Important",-1),g={href:"https://vitejs.dev/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://vitejs.dev/guide/",target:"_blank",rel:"noopener noreferrer"},f=t('<p>The structure of the Web project follows the conventions of both ASP.NET Core and Vite. The Vue-specific folders are as follows:</p><ul><li><code>/src</code> - Files that should be compiled into your application. CSS/SCSS, TypeScript, Vue SFCs, and so on.</li><li><code>/public</code> - Static assets that should be served as files. Includes index.html, the root document of the application.</li><li><code>/tests</code> - Jest unit tests.</li><li><code>/wwwroot</code> - Target for compiled output.</li></ul><p>During development, no special tooling is required to build your frontend code. Coalesce&#39;s <code>UseViteDevelopmentServer</code> in ASP.NET Core will take care of that automatically when the application starts. Just make sure NPM packages have been installed (<code>npm ci</code>).</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>If developing with Visual Studio, you are strongly encouraged to disable Visual Studio&#39;s built-in automatic NPM package restore functionality (<code>Options &gt; Projects and Solutions &gt; Web Package Management &gt; Package Restore</code>).</p><p>This feature of Visual Studio fails to respect your <code>package.lock.json</code> file, and the version of NPM that Visual Studio comes with tends to be quite old and will behave differently from the <code>npm</code> on your system&#39;s $PATH.</p><p>You should manually restore your packages with <code>npm ci</code> (when you haven&#39;t tried to change any versions) or <code>npm i</code> (when installing new packages or upgrading versions).</p></div><h2 id="data-modeling" tabindex="-1"><a class="header-anchor" href="#data-modeling" aria-hidden="true">#</a> Data Modeling</h2><p>At this point, you can open up the newly-created solution in Visual Studio and run your application. However, your application won&#39;t do much without a data model, so you will probably want to do the following before running:</p>',6),_=e("code",null,"DbSet<>",-1),w=e("code",null,"AppDbContext",-1),E=e("code",null,"ApplicationUser",-1),k=t("<li><p>Run <code>dotnet ef migrations add Init</code> (Init can be any name) in the data project to create an initial database migration.</p></li><li><p>Run Coalesce&#39;s code generation by either:</p><ul><li>Running <code>dotnet coalesce</code> in the web project&#39;s root directory</li><li>Running the <code>coalesce</code> npm script (Vue) or gulp task (Knockout) in the Task Runner Explorer</li></ul></li>",2),F=e("p",null,"You're now at a point where you can start creating your own pages!",-1),V=e("h2",{id:"building-pages-features",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#building-pages-features","aria-hidden":"true"},"#"),s(" Building Pages & Features")],-1),P=e("code",null,"Person",-1),x=e("code",null,"dotnet coalesce",-1),A=t(`<div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">namespace</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">MyApplication</span><span style="color:#D4D4D4;">.</span><span style="color:#4EC9B0;">Data</span><span style="color:#D4D4D4;">.</span><span style="color:#4EC9B0;">Models</span><span style="color:#D4D4D4;"> </span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Person</span></span>
<span class="line"><span style="color:#D4D4D4;">    {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">int</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">PersonId</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">Name</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">DateTimeOffset</span><span style="color:#D4D4D4;">? </span><span style="color:#9CDCFE;">BirthDate</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),T={href:"https://vuejs.org/v2/guide/single-file-components.html",target:"_blank",rel:"noopener noreferrer"},S=e("code",null,"MyApplication.Web/src/views/person-details.vue",-1),j=t(`<div class="language-vue line-numbers-mode" data-ext="vue"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">template</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">dl</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">dt</span><span style="color:#808080;">&gt;</span><span style="color:#D4D4D4;">Name</span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">dt</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">dd</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">c-display</span><span style="color:#D4D4D4;"> :</span><span style="color:#9CDCFE;">model</span><span style="color:#D4D4D4;">=</span><span style="color:#D4D4D4;">&quot;</span><span style="color:#9CDCFE;">person</span><span style="color:#D4D4D4;">&quot;</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">for</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;name&quot;</span><span style="color:#D4D4D4;"> /</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">dd</span><span style="color:#808080;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">dt</span><span style="color:#808080;">&gt;</span><span style="color:#D4D4D4;">Date of Birth</span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">dt</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">dd</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">c-display</span><span style="color:#D4D4D4;"> :</span><span style="color:#9CDCFE;">model</span><span style="color:#D4D4D4;">=</span><span style="color:#D4D4D4;">&quot;</span><span style="color:#9CDCFE;">person</span><span style="color:#D4D4D4;">&quot;</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">for</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;birthDate&quot;</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">format</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;M/d/yyyy&quot;</span><span style="color:#D4D4D4;"> /</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">dd</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">dl</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">template</span><span style="color:#808080;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">script</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">lang</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;ts&quot;</span><span style="color:#808080;">&gt;</span><span style="color:#D4D4D4;"> </span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">Vue</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">Component</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">Watch</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">Prop</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&quot;vue-property-decorator&quot;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">PersonViewModel</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&quot;@/viewmodels.g&quot;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">@</span><span style="color:#DCDCAA;">Component</span><span style="color:#D4D4D4;">({})</span></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">extends</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Vue</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  @</span><span style="color:#DCDCAA;">Prop</span><span style="color:#D4D4D4;">({ </span><span style="color:#9CDCFE;">required:</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">true</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">type:</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">Number</span><span style="color:#D4D4D4;"> })</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">id</span><span style="color:#D4D4D4;">!: </span><span style="color:#4EC9B0;">number</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">person</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">new</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">PersonViewModel</span><span style="color:#D4D4D4;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">created</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">this</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">person</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">$load</span><span style="color:#D4D4D4;">(</span><span style="color:#569CD6;">this</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">id</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">script</span><span style="color:#808080;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),q={class:"custom-container tip"},I=e("p",{class:"custom-container-title"},"Note",-1),M=e("code",null,"string",-1),B=e("code",null,"number",-1),N={class:"custom-container tip"},W=e("p",{class:"custom-container-title"},"TIP",-1),R={href:"https://class-component.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},L={href:"https://github.com/kaorun343/vue-property-decorator",target:"_blank",rel:"noopener noreferrer"},H={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://class-component.vuejs.org/guide/caveats.html",target:"_blank",rel:"noopener noreferrer"},O=t(`<p>We then need to add route to this new view. In <code>MyApplication.Web/src/router.ts</code>, add a new item to the <code>routes</code> array:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// At the top of the file, import the component:</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">PersonDetails</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@/views/person-details.vue&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// In the \`routes\` array, add the following item:</span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C8C8C8;">path</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">&#39;/person/:id&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C8C8C8;">name</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">&#39;person-details&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C8C8C8;">component</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">PersonDetails</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C8C8C8;">props</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">route</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> ({ </span><span style="color:#9CDCFE;">id:</span><span style="color:#D4D4D4;"> +</span><span style="color:#9CDCFE;">route</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">params</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">id</span><span style="color:#D4D4D4;"> }),</span></span>
<span class="line"><span style="color:#D4D4D4;">},</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With these pieces in place, we now have a functioning page that will display details about a person. We can start up the application (or, if it was already running, refresh the page) and navigate to <code>/person/1</code> (assuming a person with ID 1 exists - if not, navigate to <code>/admin/Person</code> and create one).</p>`,4);function G(J,U){const a=p("ExternalLinkIcon"),o=p("RouterLink");return c(),i("div",null,[d,e("p",null,[e("a",y,[u,n(a)]),s(" • "),e("a",h,[s("View on GitHub"),n(a)])]),m,e("div",v,[C,e("p",null,[s("The Vue template is based on "),e("a",g,[s("Vite"),n(a)]),s(". You are strongly encouraged to read through at least the first few pages of the "),e("a",b,[s("Vite Documentation"),n(a)]),s(" before getting started on any development.")])]),f,e("ul",null,[e("li",null,[e("p",null,[s("Create an initial "),n(o,{to:"/modeling/model-types/entities.html"},{default:l(()=>[s("Data Model")]),_:1}),s(" by adding EF entity classes to the data project and the corresponding "),_,s(" properties to "),w,s(". You will notice that the starter project includes a single model, "),E,s(", to start with. Feel free to change this model or remove it entirely. Read "),n(o,{to:"/modeling/model-types/entities.html"},{default:l(()=>[s("Entity Models")]),_:1}),s(" for more information about creating a data model.")])]),k]),F,V,e("p",null,[s("Lets say we've created a "),n(o,{to:"/modeling/model-types/entities.html"},{default:l(()=>[s("model")]),_:1}),s(" called "),P,s(" as follows, and we've ran code generation with "),x,s(":")]),A,e("p",null,[s("We can create a details page for a Person by creating a "),e("a",T,[s("Single File Component"),n(a)]),s(" in "),S,s(":")]),j,e("div",q,[I,e("p",null,[s("In the code above, "),n(o,{to:"/stacks/vue/coalesce-vue-vuetify/components/c-display.html"},{default:l(()=>[s("c-display")]),_:1}),s(" is a component that comes from the "),n(o,{to:"/stacks/vue/coalesce-vue-vuetify/overview.html"},{default:l(()=>[s("Vuetify Components")]),_:1}),s(" for Coalesce.")]),e("p",null,[s("For simple property types like "),M,s(" and "),B,s(" you can always use simple template interpolation syntax, but for more complex properties like dates, "),n(o,{to:"/stacks/vue/coalesce-vue-vuetify/components/c-display.html"},{default:l(()=>[s("c-display")]),_:1}),s(" is handy to use because it includes features like built-in date formatting.")])]),e("div",N,[W,e("p",null,[s("The code above uses "),e("a",R,[s("vue-class-component"),n(a)]),s(" and "),e("a",L,[s("vue-property-decorator"),n(a)]),s(" to define the component.")]),e("p",null,[s("These libraries provide an alternative to the default component declaration syntax in "),e("a",H,[s("Vue"),n(a)]),s(". However, you must be aware of the "),e("a",Y,[s("Caveats"),n(a)]),s(" if you want to use these tools to build your own class-style components.")])]),O,e("p",null,[s("From this point, you can start adding more fields, more features, and more flair to the page. Check out all the other documentation in the sidebar to see what else Coalesce has to offer, including the "),n(o,{to:"/stacks/vue/overview.html"},{default:l(()=>[s("Vue Overview")]),_:1}),s(".")])])}const K=r(D,[["render",G],["__file","getting-started.html.vue"]]);export{K as default};
