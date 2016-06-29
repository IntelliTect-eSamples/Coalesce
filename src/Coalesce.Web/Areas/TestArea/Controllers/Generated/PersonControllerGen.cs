
using Intellitect.ComponentModel.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.PlatformAbstractions;
// Model Namespaces
using Coalesce.Domain;
using Coalesce.Domain.External;

namespace Coalesce.Web.TestArea.Controllers
{
    [Area("TestArea")]
    [Authorize]
    public partial class PersonController 
        : BaseViewController<Person, AppDbContext> 
    { 
        public PersonController() : base() { }

        [AllowAnonymous]
        public ActionResult Table(){
            return IndexImplementation(false, @"~/Areas/TestArea/Views/Generated/Person/Table.cshtml");
        }

        [AllowAnonymous]
        public ActionResult TableEdit(){
            return IndexImplementation(true, @"~/Areas/TestArea/Views/Generated/Person/Table.cshtml");
        }

        [AllowAnonymous]
        public ActionResult CreateEdit(){
            return CreateEditImplementation(@"~/Areas/TestArea/Views/Generated/Person/CreateEdit.cshtml");
        }
                      
        [AllowAnonymous]
        public ActionResult EditorHtml(bool simple = false)
        {
            return EditorHtmlImplementation(simple);
        }
                      
        [AllowAnonymous]
        public ActionResult Docs()
        {
            return DocsImplementation();
        }    
    }
}