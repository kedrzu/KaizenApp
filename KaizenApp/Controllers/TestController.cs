using Microsoft.AspNetCore.Mvc;

namespace KaizenApp.Controllers
{
    public class TestController : Controller
    {
        [Route("api/test")]
        public IActionResult Test()
        {
            return Json(new
            {
                Test = "great success"
            });
        }
    }
}