using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

public partial class Usuario : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();
        UserManager<IdentityUser> manager = new UserManager<IdentityUser>(userStore);

        IdentityUser usu = new IdentityUser();

        usu.UserName = "ffernandez";
        usu.Email = "ffernandez@cepnet.net";

        IdentityResult resultado =  manager.Create(usu, "pepe44");

        if (resultado != IdentityResult.Success)
        {
            LabelMensajes.Text = resultado.Errors.FirstOrDefault();
        }
    }
}