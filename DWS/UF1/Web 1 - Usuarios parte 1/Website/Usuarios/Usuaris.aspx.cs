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
    protected void Page_Load(object sender, EventArgs e)
    {
        
        if (!IsPostBack)
        {
            PanelUsuaris.Visible = true;
            PanelUsuari.Visible = false;
        }

        carregarUsuaris();
    }

    /*
     * Mètodes de controls
     */
    protected void imgBttnAltaUsuari_Click(object sender, ImageClickEventArgs e)
    {
        //Donem d'alta un usuari
        usuariAlta(); 
    }
    /*Eliminem l'usuari de la base de dades i actualitzem*/
    protected void grdvwUsuaris_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        GestioBD.eliminarUsuari(e.Values[0].ToString());
        //GestioBD.eliminarUsuari(grdvwUsuaris.Rows[e.RowIndex].Cells[3].Text);
        carregarUsuaris();
    }
    /*Modifiquem l'usuari seleccionat*/
    protected void grdvwUsuaris_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {
        //Configurem panells
        usuariModificant();
        
        //Obtenim les dades de l'usuari seleccionat
        usuariDesdeBaseDades(grdvwUsuaris.Rows[e.NewSelectedIndex].Cells[3].Text);
    }
    /*Confirmació d'accions segons si estem donant d'alta o modificant un usuari.
     Configurarem visibilitats per mostrar de nou tots els usuaris de la base de dades*/
    protected void imgBttnAcceptar_Click(object sender, ImageClickEventArgs e)
    {
        if (lblTitol.Text.Equals("Alta usuari"))
        {
            GestioBD.afegirUsuari(usuariDesdeFormulari());
            netejarCamps();
        }
        else if (lblTitol.Text.Equals("Modificació d'usuari"))
        {
            GestioBD.modificarUsuari(usuariDesdeFormulari());
        }

        PanelUsuaris.Visible = true;
        PanelUsuari.Visible = false;

        carregarUsuaris();
    }
    /*Cancelem l'acció. Mostrem tots els usuaris de la base de dades*/
    protected void imgBttnCancelar_Click(object sender, ImageClickEventArgs e)
    {
        PanelUsuaris.Visible = true;
        PanelUsuari.Visible = false;

        carregarUsuaris();
    }


    /*
     * Altres mètodes
     */

    //Carrega les dades dels usuaris de la base de dades
    private void carregarUsuaris()
    {
        grdvwUsuaris.DataSource = GestioBD.llistaTotsUsuaris();
        grdvwUsuaris.DataBind();
    }
    
    //Crea un objecte IdentityUser a partir de les dades del formulari i el retorna
    private IdentityUser usuariDesdeFormulari()
    {
        IdentityUser usuari = new IdentityUser();

        usuari.UserName = txtbxNomUsuari.Text;
        usuari.PasswordHash = txtbxContrasena.Text;
        usuari.Email = txtbxCorreuE.Text;
        usuari.PhoneNumber = txtbxTelefon.Text;

        return usuari;
    }

    //Carrega les dades d'un usuari des d'un IdentityUser trobat a la base de dades
    private void usuariDesdeBaseDades(String nomUsuari)
    {
        IdentityUser usuari = GestioBD.buscarUsuari(nomUsuari)[0];

        txtbxNomUsuari.Text = usuari.UserName;
        txtbxCorreuE.Text = usuari.Email;
        txtbxTelefon.Text = usuari.PhoneNumber;
    }

    //Configurem la vista per quan donem d'alta un usuari
    private void usuariAlta()
    {
        //Títol mode
        lblTitol.Text = "Alta usuari";

        //Visibilitat panells
        PanelUsuari.Visible = true;
        PanelUsuaris.Visible = false;

        //Controls del panell
        txtbxNomUsuari.Enabled = true;
        txtbxNomUsuari.Visible = true;
        txtbxConfContrasena.Visible = true;
        txtbxContrasena.Visible = true;

        lblConfContrasena.Visible = true;
        lblContrasena.Visible = true;

        cmprVldtrContrasena.Enabled = true;
        fldVldtrContrasena.Enabled = true;
        fldVldtrNomUsuari.Enabled = true; 
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

    }

    //Netejem camps
    private void netejarCamps()
    {
        txtbxNomUsuari.Text = "";
        txtbxCorreuE.Text = "";
        txtbxTelefon.Text = "";
    }
}