using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

public partial class Rols : System.Web.UI.Page
{
    //Atributs de la classe que utilitzarem a diferents mètodes
    private static UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();
    private static UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(userStore);
    private static RoleStore<IdentityRole> roleStore = new RoleStore<IdentityRole>();
    private static RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(roleStore);

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //Configurem visibilitat
            panelRols.Visible = true;
            panelUnRol.Visible = false;
        }

        //Carreguem i mostrem tots els rols de la base de dades
        carregarRols();
    }

    //
    // Mètodes de controls
    //

    //Acció per quan es prem el botó d'Alta
    protected void bttnAltaRol_Click(object sender, ImageClickEventArgs e)
    {
        rolAlta();
    }

    //Eliminem un rol seleccionat i tornem a mostrar els rols que hi ha a la base de dades
    //En cas d'error es mostra el missatge corresponent
    protected void grdvwRols_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        IdentityRole rol = roleManager.FindByName(grdvwRols.Rows[e.RowIndex].Cells[2].Text);
        IdentityResult result = roleManager.Delete(rol);

        if (!result.Succeeded)
        {
            lblMissatgesRol.Text = result.Errors.First();
        }
        else
        {
            lblMissatgesRol.Text = "Rol eliminat correctament.";

            //Per evitar que un usuari intenti modificar un rol que s'ha eliminat, cambiem visibilitat dels
            //panells i netejem les dades
            if (panelUnRol.Visible == true)
            {
                netejarCamps();
                panelUnRol.Visible = false;
            }
        }

        carregarRols();
    }

    //Acció per quan es prem el botó de Modificar
    protected void grdvwRols_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {
        //Obtenim el nom del rol de la GridView
        String nomRol = grdvwRols.Rows[e.NewSelectedIndex].Cells[2].Text;
        //Mode mofificar
        rolModificant(nomRol);
    }

    //Acció per quan es prem el botó d'Acceptar
    //Segons si es tracta d'una alta o una modificació actuarà de diferent manera
    //En cas d'error, mostrarà el missatge corresponent
    protected void imgBttnAcceptar_Click(object sender, ImageClickEventArgs e)
    {
        IdentityResult result;

        //Confirmem que volem crear un nou rol i el guardem a la base de dades.
        if (lblTitolRol.Text.Equals("Alta rol"))
        {
            IdentityRole rol = new IdentityRole(txtbxRol.Text);
            //Cridem al mètode per assignar tots els usuaris que l'usuari a asignat al rol
            assignacioRols(rol);
            result = roleManager.Create(rol);

            if (!result.Succeeded)
            {
                lblMissatgesRol.Text = result.Errors.First();
            }
            else
            {
                lblMissatgesRol.Text = "Rol afegit correctament.";
                netejarCamps();
                panelUnRol.Visible = false;
                carregarRols();
            }

        }
        //Confirmem la modificació d'un rol i s'actualitzen les dades a la base de dades
        else if (lblTitolRol.Text.Equals("Modificar rol"))
        {
            IdentityRole rol = roleManager.FindByName(grdvwRols.Rows[grdvwRols.SelectedIndex].Cells[2].Text);
            //Netejem la llista d'usuaris assignats al rol per assignar-ne la nova llista indicada per l'usuari
            rol.Users.Clear();
            assignacioRols(rol);

            result = roleManager.Update(rol);

            if (!result.Succeeded)
            {
                lblMissatgesRol.Text = result.Errors.First();
            }
            else 
            {
                lblMissatgesRol.Text = "Rol modificat correctament.";
                netejarCamps();
                panelUnRol.Visible = false;
                carregarRols();
            }
        }
    }
    
    //Acció per quan es prem el botó de Cancelar
    //Es cancela l'operació d'alta o modificació, mostra tots els rols de la base de dades i informa a l'usuari 
    //que una operació ha sigut cancelada
    protected void imgBttnCancelar_Click(object sender, ImageClickEventArgs e)
    {
        panelUnRol.Visible = false;
        netejarCamps();
        carregarRols();
        lblMissatgesRol.Text = "Operació cancelada.";
    }

    //-Hay que hacer que mueva varios a la vez
    //Acció per quan es prem el botó d'Assignar
    //Assigna un element de la llista d'Usuaris Disponibles a la llista d'Usuaris Assignats
    protected void bttnAssignar_Click(object sender, EventArgs e)
    {
        
        if (lstbxUsuPossRol.SelectedItem != null)
        {
            ListItem usuari = lstbxUsuPossRol.SelectedItem;
            lstbxUsuAsigRol.Items.Add(lstbxUsuPossRol.SelectedItem);
            lstbxUsuPossRol.Items.Remove(usuari);
        }
        else 
        {
            lblMissatgesRol.Text = "No has seleccionat cap usuari.";
        }
        
    }

    //Acció per quan es prem el botó de Desassignar
    //Desassigna un element de la llista d'Usuaris Assignats. Aquest es tornarà a mostrara la llista 
    //d'Usuaris Disponibles
    protected void bttnDessasignar_Click(object sender, EventArgs e)
    {
        if (lstbxUsuAsigRol.SelectedItem != null)
        {
            ListItem usuari = lstbxUsuAsigRol.SelectedItem;
            lstbxUsuPossRol.Items.Add(usuari);
            lstbxUsuAsigRol.Items.Remove(usuari);
        }
        else 
        {
            lblMissatgesRol.Text = "No has seleccionat cap usuari.";
        }
    }

    //
    // Altres mètodes
    //

    //Mètode que carrega els rols de la base de dades i els mostra en una GridView
    private void carregarRols()
    {
        grdvwRols.DataSource = roleManager.Roles.ToList();
        grdvwRols.DataBind();        
    }

    //Mètode que aplica les modificacions pertinents per quan es dona d'Alta un usuari
    //Es carreguen tots els Usuaris Disponibles per poder assignar-los al nou rol
    private void rolAlta()
    {
        lblTitolRol.Text = "Alta rol";

        panelUnRol.Visible = true;
        
        lstbxUsuPossRol.DataSource = userManager.Users.ToList();
        lstbxUsuPossRol.DataTextField = "UserName";
        //-lstbxUsuPossRol.DataValueField = "Id";
        lstbxUsuPossRol.DataBind();

        lblMissatgesRol.Text = "";
    }

    //Mètode que aplica les modificacions pertinents per quan es Modifica un usuari
    //Es busca el rol a modificar a la base de dades i s'en mostren les dades
    private void rolModificant(String nomRol)
    {
        lblTitolRol.Text = "Modificar rol";

        netejarCamps();

        IdentityRole rol = roleManager.FindByName(nomRol);
        txtbxRol.Text = rol.Name;

        panelUnRol.Visible = true;
        txtbxRol.Enabled = false;

        //Busquem les relacions entre el rol a modificar i els usuaris que el tenen asignat
        List<IdentityUserRole> usuarisRol = rol.Users.ToList();
        //Carreguem la llista d'usuaris del rol i la mostrem
        carregarUsuarisRol(usuarisRol);
        lstbxUsuPossRol.DataSource = userManager.Users.ToList();
        lstbxUsuPossRol.DataTextField = "UserName";
        //-lstbxUsuPossRol.DataValueField = "Id";
        lstbxUsuPossRol.DataBind();

        //Eliminem de la llista d'Usuaris Disponibles els usuaris que ja estan assignats
        eliminarUsuarisJaAssignats();

        lblMissatgesRol.Text = "";
    }

    //Mètode que compara els Usuaris ja Assignats amb els Usuaris Disponibles. Si ja estan a la primera llista,
    //s'eliminaran de la segona
    private void eliminarUsuarisJaAssignats()
    {
        foreach (ListItem item in lstbxUsuAsigRol.Items)
        {
            //-Np hace falta el if
            if (lstbxUsuPossRol.Items.Contains(item))
            {
                lstbxUsuPossRol.Items.Remove(item);
            }
        }
    }

    //Mètode que rep una llista que relaciona un rol amb els Usuaris que té Assignats, busca
    //els usuaris a la base de dades i en mostra els noms.
    private void carregarUsuarisRol(List<IdentityUserRole> usuarisRol)
    {
        //Per cada relació rol-usuari busquem l'usuari i n'afegim el nom a la llista d'usuaris assignats al rol.
        foreach (IdentityUserRole usuari in usuarisRol)
        {
            lstbxUsuAsigRol.Items.Add(userManager.FindById(usuari.UserId).UserName);
        }
    }

    //Mètode per assigar els usuaris de la llista d'usuaris assignats al rol. Per fer-ho, busca cadascun dels usuaris
    //a assignar a la base de dades per obternir-ne l'identificador i assignarlo a un nou objecte IdentityUserRole, 
    //junt amb l'identificador del rol, per tal de relacionar cada Usuari amb el Rol
    private void assignacioRols(IdentityRole rol)
    {
        //Per cada element de la llista d'usuaris de la listbox d'usuaris assignats
        foreach (ListItem item in lstbxUsuAsigRol.Items)
        {
            //Obtenim l'objecte IdentityUser corresponent a un nom d'usuari de la llista de la Base de Dades
            IdentityUser usuari = userManager.FindByName(item.Text);
            //Creem un objecte IdentityUserRole que ens relacionarà el Rol amb l'Usuari guardant
            //l'id d'ambdós.
            IdentityUserRole usuariRol = new IdentityUserRole();
            usuariRol.RoleId = rol.Id;
            usuariRol.UserId = usuari.Id;
            
            //Afegim l'objecte relacionant a la llista d'usuaris del rol.
            rol.Users.Add(usuariRol);
        }
    }

    //Netejem camps
    private void netejarCamps()
    {
        txtbxRol.Text = "";
        txtbxRol.Enabled = true;
        lstbxUsuAsigRol.Items.Clear();
        lstbxUsuPossRol.Items.Clear();
    }
}