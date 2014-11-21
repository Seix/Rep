using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

public partial class Usuaris : System.Web.UI.Page
{
    private static UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();
    private static UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(userStore);

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            PanelUsuaris.Visible = true;
            PanelUsuari.Visible = false;
        }

        carregarUsuaris();
    }

    //
    // Mètodes de controls
    //

    protected void imgBttnAltaUsuari_Click(object sender, ImageClickEventArgs e)
    {
        //Donem d'alta un usuari
        usuariAlta(); 
    }
    //Eliminem l'usuari de la base de dades i actualitzem
    protected void grdvwUsuaris_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        IdentityUser usuari = userManager.FindByName(grdvwUsuaris.Rows[e.RowIndex].Cells[3].Text);
        userManager.Delete(usuari);
        carregarUsuaris();
    }
    //Modifiquem l'usuari seleccionat
    protected void grdvwUsuaris_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {
        //Configurem panells
        usuariModificant();
    }
    //Confirmació d'accions segons si estem donant d'alta o modificant un usuari. En cas d'error mostrem
    //el missatge a l'usuari
    protected void imgBttnAcceptar_Click(object sender, ImageClickEventArgs e)
    {
        IdentityResult result;
        
        if (lblTitol.Text.Equals("Alta usuari"))
        {
            result = userManager.Create(usuariDesdeFormulari(), txtbxContrasena.Text);
            
            if (!result.Succeeded)
            {
                lblMissatgesUsuari.Text = result.Errors.First();
            }
            else 
            {
                lblMissatgesUsuaris.Text = "Usuari afegit correctament.";
                lblMissatgesUsuari.Text = "";
                netejarCamps();

                PanelUsuaris.Visible = true;
                PanelUsuari.Visible = false;

                carregarUsuaris();
            }
        }
        else if (lblTitol.Text.Equals("Modificació d'usuari"))
        {
            result = userManager.Update(usuariDesdeFormulari());
            if (!result.Succeeded)
            {
                lblMissatgesUsuari.Text = result.Errors.First();
            }
            else 
            {
                lblMissatgesUsuaris.Text = "Usuari modificat correctament.";
                lblMissatgesUsuari.Text = "";
                netejarCamps();

                PanelUsuaris.Visible = true;
                PanelUsuari.Visible = false;

                carregarUsuaris();
            }
        }
    }
    //Cancelem l'acció. Mostrem tots els usuaris de la base de dades
    protected void imgBttnCancelar_Click(object sender, ImageClickEventArgs e)
    {
        PanelUsuaris.Visible = true;
        PanelUsuari.Visible = false;
        netejarCamps();
        carregarUsuaris();
        lblMissatgesUsuaris.Text = "Operació cancelada.";
    }


    //
    // Altres mètodes
    //

    //Carrega les dades dels usuaris de la base de dades
    private void carregarUsuaris()
    {
        grdvwUsuaris.DataSource = userManager.Users.ToList();
        grdvwUsuaris.DataBind();
    }
    
    //Crea un objecte IdentityUser a partir de les dades del formulari i el retorna
    private IdentityUser usuariDesdeFormulari()
    {
        IdentityUser usuari = new IdentityUser();

        usuari.UserName = txtbxNomUsuari.Text;
        usuari.Email = txtbxCorreuE.Text;
        usuari.PhoneNumber = txtbxTelefon.Text;

        return usuari;
    }

    //Carrega les dades d'un usuari des d'un IdentityUser trobat a la base de dades
    private void usuariDesdeBaseDades(String nomUsuari)
    {
        IdentityUser usuari = userManager.FindByName(nomUsuari);

        txtbxNomUsuari.Text = usuari.UserName;
        txtbxCorreuE.Text = usuari.Email;
        txtbxTelefon.Text = usuari.PhoneNumber;
    }

    //Configurem la vista per quan donem d'alta un usuari
    private void usuariAlta()
    {
        vistaAltaUsuari();
    }

    private void vistaAltaUsuari()
    {
        //Títol mode
        lblTitol.Text = "Alta usuari";

        //Visibilitat panells
        PanelUsuari.Visible = true;
        PanelUsuaris.Visible = false;

        //Visibilitat controls panell
        foreach (Control control in PanelUsuari.Controls)
        {
            control.Visible = true;
        }

        txtbxNomUsuari.Enabled = true;

        cmprVldtrContrasena.Enabled = true;
        fldVldtrContrasena.Enabled = true;
        fldVldtrNomUsuari.Enabled = true;

        lblMissatgesUsuaris.Text = "";
    }

    //Configurem la vista per quan modifiquem un usuari
    private void usuariModificant()
    {
        //Títol mode
        lblTitol.Text = "Modificació d'usuari";

        //Visibilitat panells
        PanelUsuari.Visible = true;
        PanelUsuaris.Visible = false;

        //Controls del panell
        txtbxNomUsuari.Enabled = false;
        txtbxConfContrasena.Visible = false;
        txtbxContrasena.Visible = false;

        lblConfContrasena.Visible = false;
        lblContrasena.Visible = false;

        lblMissatgesUsuaris.Text = "";
    }

    //Netejem camps
    private void netejarCamps()
    {
        foreach (Control control in PanelUsuari.Controls)
        {
            if (control is TextBox)
            {
                ((TextBox)control).Text = "";
            }
        }
    }
}