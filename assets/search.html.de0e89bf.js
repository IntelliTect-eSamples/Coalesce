import{_ as r,r as o,o as i,c,e as s,b as e,d as a,a as t}from"./app.33ffcc50.js";const p={},d=t(`<h1 id="search" tabindex="-1"><a class="header-anchor" href="#search" aria-hidden="true">#</a> [Search]</h1><p>Coalesce supports searching through the generated API in its various implementations, including the generated list views (Table &amp; Cards), in Select2 dropdowns, and directly through the TypeScript ListViewModels&#39; <code>search</code> property.</p><p>The <code>search</code> parameter of the API can also be formatted as <code>PropertyName:SearchTerm</code> in order to search on an arbitrary property of a model. For example, a value of <code>Nickname:Steve-o</code> for a search term would search the <code>Nickname</code> property, even through it is not marked as searchable using this attribute.</p><p>By default, the system will search any field with the name &#39;Name&#39;. If this doesn&#39;t exist, the ID is used as the only searchable field. Once you place the <code>Search</code> attribute on one or more properties on a model, only those annotated properties will be searched.</p><h2 id="searchable-property-types" tabindex="-1"><a class="header-anchor" href="#searchable-property-types" aria-hidden="true">#</a> Searchable Property Types</h2><h4 id="strings" tabindex="-1"><a class="header-anchor" href="#strings" aria-hidden="true">#</a> Strings</h4><p>String fields will be searched based on the <code>SearchMethod</code> property on the attribute. See below.</p><h4 id="numeric-types" tabindex="-1"><a class="header-anchor" href="#numeric-types" aria-hidden="true">#</a> Numeric Types</h4><p>If the input is numeric, numeric fields will be searched for the exact value.</p><h4 id="enums" tabindex="-1"><a class="header-anchor" href="#enums" aria-hidden="true">#</a> Enums</h4><p>If the input is a valid name of an enum value for an enum property and that property is searchable, rows will be searched for the exact value.</p><h4 id="dates" tabindex="-1"><a class="header-anchor" href="#dates" aria-hidden="true">#</a> Dates</h4><p>If the input is a parsable date, rows will be searched based on that date.</p><p>Date search will do its best to guess at the user&#39;s intentions:</p><ul><li>Various forms of year/month combos are supported, and if only a year/month is inputted, it will look for all dates in that month, e.g. &quot;Feb 2017&quot; or &quot;2016-11&quot;.</li><li>A date without a time (or a time of exactly midnight) will search the entire day, e.g. &quot;2017/4/18&quot;.</li><li>A date/time with minutes and seconds equal to 0 will search the entire hour, e.g. &quot;April 7, 2017 11 AM&quot;.</li></ul><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>When searching on date properties, you should almost always set <code>IsSplitOnSpaces = false</code> on the <code>Search</code> attribute. This allows natural inputs like &quot;July 21, 2017&quot; to search correctly. Otherwise, only non-whitespace date formats will work, like &quot;2017/21/07&quot;.</p></div><h4 id="reference-navigation-properties" tabindex="-1"><a class="header-anchor" href="#reference-navigation-properties" aria-hidden="true">#</a> Reference Navigation Properties</h4><p>When a reference navigation property is marked with <code>[Search]</code>, searchable properties on the referenced object will also be searched. This behavior will go up to two levels away from the root object, and can be controlled with the <code>RootWhitelist</code> and <code>RootBlacklist</code> properties on the <code>[Search]</code> attribute that are outlined below.</p><h4 id="collection-navigation-properties" tabindex="-1"><a class="header-anchor" href="#collection-navigation-properties" aria-hidden="true">#</a> Collection Navigation Properties</h4><p>When a collection navigation property is marked with <code>[Search]</code>, searchable properties on the child objects will also be searched. This behavior will go up to two levels away from the root object, and can be controlled with the <code>RootWhitelist</code> and <code>RootBlacklist</code> properties on the <code>[Search]</code> attribute that are outlined below.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>Searches on collection navigation properties usually don&#39;t translate well with EF Core, leading to potentially degraded performance. Use this feature cautiously.</p></div><h2 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage" aria-hidden="true">#</a> Example Usage</h2><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Person</span></span>
<span class="line"><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">int</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">PersonId</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    [</span><span style="color:#4EC9B0;">Search</span><span style="color:#D4D4D4;">]</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">FirstName</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    [</span><span style="color:#4EC9B0;">Search</span><span style="color:#D4D4D4;">]</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">LastName</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    [</span><span style="color:#4EC9B0;">Search</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">IsSplitOnSpaces</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">false</span><span style="color:#D4D4D4;">)]</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">BirthDate</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">string</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">Nickname</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    [</span><span style="color:#4EC9B0;">Search</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">RootWhitelist</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">nameof</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">Person</span><span style="color:#D4D4D4;">))]</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">public</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">ICollection</span><span style="color:#D4D4D4;">&lt;</span><span style="color:#4EC9B0;">Address</span><span style="color:#D4D4D4;">&gt; </span><span style="color:#9CDCFE;">Addresses</span><span style="color:#D4D4D4;"> { </span><span style="color:#569CD6;">get</span><span style="color:#D4D4D4;">; </span><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;">; }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="properties" tabindex="-1"><a class="header-anchor" href="#properties" aria-hidden="true">#</a> Properties</h2>`,24),h=e("p",null,[a("If set to true (the default), each word in the search terms will be searched for in each searchable field independently, and a row will only be considered a match if each word in the search term is a match on at least one searchable property where "),e("code",null,"IsSplitOnSpaces == true")],-1),D=e("code",null,"IsSplitOnSpaces = true",-1),u={href:"https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/",target:"_blank",rel:"noopener noreferrer"},y=t("<p>For string properties, specifies how the value in the property/column will be matched.</p><ul><li><code>BeginsWith</code>: Search term will be checked for at the beginning of the field&#39;s value in a case insensitive manner.</li><li><code>Equals</code>: Search term must match the field exactly in a case insensitive manner.</li><li><code>EqualsNatural</code>: Search term must match exactly, using the natural casing handling of the evaluation environment. Default database collation will be used if evaluated in SQL, and exact casing will be used if evaluated in memory. This allows index seeks to be used instead of index scans, providing extra high performance searches against indexed columns</li><li><code>Contains</code>: Search term will be checked for anywhere inside the field&#39;s value in a case insensitive manner. <strong>Will be slow against large databases - performance cannot be improved with database indexing.</strong></li></ul>",2),m=e("p",null,"A comma-delimited list of model class names that, if set, will prevent the targeted property from being searched unless the root object of the API call was one of the specified class names.",-1),b=e("p",null,"A comma-delimited list of model class names that, if set, will prevent the targeted property from being searched if the root object of the API call was one of the specified class names.",-1);function f(v,g){const n=o("Prop"),l=o("ExternalLinkIcon");return i(),c("div",null,[d,s(n,{def:"public bool IsSplitOnSpaces { get; set; } = true;"}),h,e("p",null,[a("This is useful when searching for a full name across two or more fields. In the above example, using "),D,a(" would provide more intuitive behavior since it will search both first name and last name for each word entered into the search field. But, "),e("a",u,[a("you probably shouldn't be doing that"),s(l)]),a(".")]),s(n,{def:"public SearchMethods SearchMethod { get; set; } = SearchMethods.BeginsWith;"}),y,s(n,{def:"public string RootWhitelist { get; set; } = null;"}),m,s(n,{def:"public string RootBlacklist { get; set; } = null;"}),b])}const C=r(p,[["render",f],["__file","search.html.vue"]]);export{C as default};
