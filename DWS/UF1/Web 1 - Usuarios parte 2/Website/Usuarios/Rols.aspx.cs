using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Rols : System.Web.UI.Page
{
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

    //Donem d'alta un rol
    protected void bttnAltaRol_Click(object sender, ImageClickEventArgs e)
    {
        rolAlta();
    }

    //Eliminem un rol seleccionat i tornem a mostrar els rols que hi ha a la base de dades
    protected void grdvwRols_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        GestioBD.eliminarRol(grdvwRols.Rows[e.RowIndex].Cells[2].Text);
        carregarRols();
    }

    //Modifiquem un rol seleccionat
    protected void grdvwRols_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {
        //Obtenim el nom del rol
        String nomRol = grdvwRols.Rows[e.NewSelectedIndex].Cells[2].Text;
        //Mode mofificar
        rolModificant(nomRol);
    }

    //Botó de confirmació
    protected void imgBttnAcceptar_Click(object sender, ImageClickEventArgs e)
    {
        //Confirmem que volem crear un nou rol i el guardem a la base de dades.
        if (lblTitolRol.Text.Equals("Alta rol"))
        {
            IdentityRole rol = new IdentityRole(txtbxRol.Text);
            assignacioRols(rol);
            GestioBD.afegirRol(rol);

        }
        //Confirmem la modificació d'un rol i s'actualitzen les dades a la base de dades.
        else if (lblTitolRol.Text.Equals("Modificar rol"))
        {
            IdentityRole rol = GestioBD.buscarRol(txtbxRol.Text);
            rol.Users.Clear();
            assignacioRols(rol);
            GestioBD.modificarRol(rol);
        }

        netejarCamps();
        panelUnRol.Visible = false;
        carregarRols();
    }
    
    //Botó de cancelació de l'operació
    protected void imgBttnCancelar_Click(object sender, ImageClickEventArgs e)
    {
        panelUnRol.Visible = false;
        netejarCamps();
    }

    //Botó per assignar usuaris existents a la base de dades a la llista d'un rol.
    protected void bttnAssignar_Click(object sender, EventArgs e)
    {
        ListItem usuari = lstbxUsuPossRol.SelectedItem;
        lstbxUsuAsigRol.Items.Add(lstbxUsuPossRol.SelectedItem);
        lstbxUsuPossRol.Items.Remove(usuari);
    }

    //Botó per desassignar usuaris d'un rol. Els no assignats els tornarà a mostrar a la llista 
    //d'usuaris possibles.
    protected void bttnDessasignar_Click(object sender, EventArgs e)
    {
        ListItem usuari = lstbxUsuAsigRol.SelectedItem;
        lstbxUsuPossRol.Items.Add(usuari);
        lstbxUsuAsigRol.Items.Remove(usuari);
    }

    //Mètode per carregar els rols que hi ha a la base de dades.
    private void carregarRols()
    {
        grdvwRols.DataSource = GestioBD.llistaTotsRols();
        grdvwRols.DataBind();
    }

    //Mode per quan estem donant d'alta un rol.
    private void rolAlta()
    {
        //Títol mode
        lblTitolRol.Text = "Alta rol";

        panelUnRol.Visible = true;
        
        lstbxUsuPossRol.DataSource = GestioBD.llistaTotsUsuaris();
        lstbxUsuPossRol.DataTextField = "UserName";
        lstbxUsuPossRol.DataBind();
    }

    //Mode per quan estem modificant un rol
    private void rolModificant(String nomRol)
    {
        lblTitolRol.Text = "Modificar rol";

        IdentityRole rol = GestioBD.buscarRol(nomRol);
        txtbxRol.Text = rol.Name;
        //Configurem visibilitat dels panells
        panelUnRol.Visible = true;
        txtbxRol.Enabled = false;

        //Busquem les relacions entre el rol a modificar i els usuaris que el tenen asignat
        List<IdentityUserRole> usuarisRol = rol.Users.ToList();
        //Carreguem la llista d'usuaris del rol i la mostrem
        carregarUsuarisRol(usuarisRol);
        lstbxUsuPossRol.DataSource = GestioBD.llistaTotsUsuaris();
        lstbxUsuPossRol.DataTextField = "UserName";
        lstbxUsuPossRol.DataBind();

        eliminarUsuarisJaAssignats();
    }

    //Comprovem que els usuaris ja assignats no estiguin a la llista de possibles. Si hi són, els
    //eliminem de la llista.
    private void eliminarUsuarisJaAssignats()
    {
        //Eliminem els usuaris ja assignats
        foreach (ListItem item in lstbxUsuAsigRol.Items)
        {
            if (lstbxUsuPossRol.Items.Contains(item))
            {
                lstbxUsuPossRol.Items.Remove(item);
            }
        }
    }

    //Mètode que rep una llista que relaciona un rol amb els usuaris que té assignats, busca
    //els usuaris a la base de dades i en mostra els noms.
    private void carregarUsuarisRol(List<IdentityUserRole> usuarisRol)
    {
        //Per cada relació rol-usuari busquem l'usuari i n'afegim el nom a la llista d'usuaris assignats al rol.
        foreach (IdentityUserRole usuari in usuarisRol)
        {
            lstbxUsuAsigRol.Items.Add(GestioBD.buscarUsuariId(usuari.UserId).UserName);
        }
    }

    //Mètode per assigar els usuaris de la llista d'usuaris assignats al rol
    private void assignacioRols(IdentityRole rol)
    {
        //Per cada element de la llista d'usuaris de la listbox d'usuaris assignats
        foreach (ListItem item in lstbxUsuAsigRol.Items)
        {
            //Obtenim l'objecte IdentityUser corresponent a un nom d'usuari de la llista de la Base de Dades
            IdentityUser usuari = GestioBD.buscarUsuariNom(item.Text);
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