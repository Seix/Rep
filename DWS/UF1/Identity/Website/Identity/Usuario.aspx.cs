using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

public partial class Usuario : System.Web.UI.Page
{
    //static UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();

    protected void Page_Load(object sender, EventArgs e)
    {
        UserStore<IdentityUser> userStore     = new UserStore<IdentityUser>();
        UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(userStore);
        
        IdentityUser usu = new IdentityUser();

        usu.UserName = "imesa";
        usu.Email = "seix@live.com";
        
        IdentityResult resul = userManager.Create(usu, "cepcep");

        if (resul != IdentityResult.Success)
        {
            Label1.Text = resul.Errors.FirstOrDefault();
        }
    }
}