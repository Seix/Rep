using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Peticio : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Obtenir data actual si és la primera vegada que carrega la pàgina
        if (!IsPostBack)
        {
            calendari.SelectedDate = calendari.TodaysDate;
            // or DateTime.Today
            comprobarTorns();
        }
    }

    //Carrega els cursos on està matriculat segons el torn seleccionat
    protected void rdbtnlstTornEsta_SelectedIndexChanged(object sender, EventArgs e)
    {
        carregarTornsMatriculat();
    }

    //Carrega els cursos on es vol matricular segons el torn seleccionat
    protected void rdbtnlstTornVol_SelectedIndexChanged(object sender, EventArgs e)
    {
        carregarTornsMatricularse();
    }

    //Afegeix totes les dades del formulari al listBoxResum
    protected void btnAfegirResum_Click(object sender, EventArgs e)
    {

        if (drpdpwnlstCursMat.SelectedIndex      != 0 &&
            drpdwnlstCursNou.SelectedIndex       != 0 &&
            drpdpwnlstTutorMat.SelectedIndex     != 0 &&
            drpdwnlstTutorNou.SelectedIndex      != 0 &&
            drpdpwnlstProfessorMat.SelectedIndex != 0 &&
            drpdwnlstProfessorNou.SelectedIndex  != 0)
        {

            string resum = "";

            resum = calendari.SelectedDate.ToString() + "; " + txtbxCognoms.Text + ", " + txtbxNom.Text +
                "; " + drpdpwnlstModul.SelectedItem.Text + "; ";

            foreach (ListItem item in chkbxlstUfs.Items)
            {
                if (item.Selected)
                {
                    resum = resum + item.Text + "; ";
                }
            }

            resum = resum + rdbtnlstTornEsta.SelectedItem.Text +   "; " + drpdpwnlstCursMat.SelectedItem.Text +
                     "; " + drpdpwnlstTutorMat.SelectedItem.Text + "; " + drpdpwnlstProfessorMat.SelectedItem.Text + "; ";

            resum = resum + rdbtnlstTornVol.SelectedItem.Text +   "; " + drpdwnlstCursNou.SelectedItem.Text +
                     "; " + drpdwnlstTutorNou.SelectedItem.Text + "; " + drpdwnlstProfessorNou.SelectedItem.Text + "; ";

            //Comprovem que el que volem introduir no existeix al listBoxResum
            //Se puede hacer también con el "contains"
            bool trobat = false;

            foreach (ListItem item in lstbxResum.Items)
            {
                if (item.ToString().Equals(resum))
                {
                    trobat = true;
                }
            }

            //Si ja ha sigut introduït, advertim a l'usuari i no l'afegim
            if (trobat)
            {
                lblMissatges.Text = "";
                lblMissatges.Text = "Aquest registre ja existeix!";
            }
            else
            {
                lblMissatges.Text = "";
                lstbxResum.Items.Add(resum);
            }
        }
        else 
        {
            lblMissatges.Text = "";
            lblMissatges.Text = "Falten dades per completar.";
        }
    }

    //Elimina els registres seleccionats del listBoxResum
    protected void btnEliminarSel_Click(object sender, EventArgs e)
    {
        int i = lstbxResum.Items.Count - 1;

        while (i >= 0)
        {
            if (lstbxResum.Items[i].Selected)
            {
                lstbxResum.Items.RemoveAt(i);
            }

            i--;
        }
    }
    
    //Elimina tots els registres del listBoxResum
    protected void btnEliminarTot_Click(object sender, EventArgs e)
    {
        lstbxResum.Items.Clear();
    }
       
    //Funció que completa els llistats des diferents cursos
    private void comprobarTorns()
    {
        carregarTornsMatriculat();
        carregarTornsMatricularse();
    }

    //Omple el llistat de cursos on està matriculat segons el torn
    private void carregarTornsMatriculat()
    {
        drpdpwnlstCursMat.Items.Clear();
        if (rdbtnlstTornEsta.SelectedValue.Equals("Mati"))
        {
            drpdpwnlstCursMat.Items.Add("(seleccionar)");
            drpdpwnlstCursMat.Items.Add("DAM1A");
            drpdpwnlstCursMat.Items.Add("DAM2A");
            drpdpwnlstCursMat.Items.Add("DAW1A");
            drpdpwnlstCursMat.Items.Add("DAW2A");
            drpdpwnlstCursMat.Items.Add("ASIX1A");
            drpdpwnlstCursMat.Items.Add("ASIX2A");
        }
        else
        {
            drpdpwnlstCursMat.Items.Add("(seleccionar)");
            drpdpwnlstCursMat.Items.Add("DAM1T");
            drpdpwnlstCursMat.Items.Add("DAM2T");
        }
    }

    //Omple el llistat de cursos on vol matricularse segons el torn
    private void carregarTornsMatricularse()
    {
        drpdwnlstCursNou.Items.Clear();
        if (rdbtnlstTornVol.SelectedValue.Equals("Mati"))
        {
            drpdwnlstCursNou.Items.Add("(seleccionar)");
            drpdwnlstCursNou.Items.Add("DAM1A");
            drpdwnlstCursNou.Items.Add("DAM2A");
            drpdwnlstCursNou.Items.Add("DAW1A");
            drpdwnlstCursNou.Items.Add("DAW2A");
            drpdwnlstCursNou.Items.Add("ASIX1A");
            drpdwnlstCursNou.Items.Add("ASIX2A");
        }
        else
        {
            drpdwnlstCursNou.Items.Add("(seleccionar)");
            drpdwnlstCursNou.Items.Add("DAM1T");
            drpdwnlstCursNou.Items.Add("DAM2T");
        }
    }

}