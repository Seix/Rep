using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

/// <summary>
/// Classe encarregada de la gestió de dades amb la Base de Dades i els formularis de
/// l'aplicació
/// </summary>
public static class GestioBD
{
    private static UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();
    private static UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(userStore);
    private static RoleStore<IdentityRole> rolStore = new RoleStore<IdentityRole>();
    private static RoleManager<IdentityRole> rolManager = new RoleManager<IdentityRole>(rolStore);

    public static List<IdentityUser> llistaTotsUsuaris()
    {
        List <IdentityUser> lstIdntUser = new List<IdentityUser>();
        return userManager.Users.ToList();
    }

    public static String afegirUsuari(IdentityUser usuari, String pass)
    {
        String missatge = "";

        IdentityResult resultat = userManager.Create(usuari, pass);

        if (resultat.Succeeded)
        {
            missatge = "Usuari afegit correctament.";
        }
        else 
        {
            missatge = "No s'ha pogut afegir l'usuari. Comprobar nom d'usuari i longitud " +
                "de la contrasenya.";
        }

        return missatge;
    }
    
    public static IdentityUser buscarUsuariNom(String nomUsuari)
    {
        IdentityUser usuariTrobat = new IdentityUser();

        try 
        {
            usuariTrobat = userManager.FindByName(nomUsuari);
        }
        catch(Exception e)
        {

        }

        return usuariTrobat;
    }

    public static IdentityUser buscarUsuariId(String id)
    {
        IdentityUser usuariTrobat = new IdentityUser();

        try
        {
            usuariTrobat = userManager.FindById(id);
        }
        catch (Exception e)
        {

        }

        return usuariTrobat;
    }

    public static void eliminarUsuari(String nomUsuari)
    {
        IdentityUser usuari = new IdentityUser();

        try 
        { 
            usuari = buscarUsuariNom(nomUsuari);
            IdentityResult resul = userManager.Delete(usuari);
        }
        catch(Exception e)
        {
            
        }
    }

    public static void modificarUsuari(IdentityUser usuariModificat)
    {
        
        try
        {
            userManager.Update(usuariModificat);
        }
        catch(Exception e)
        {
            
        }
    }



    public static List<IdentityRole> llistaTotsRols()
    {
        List<IdentityRole> lstIdntRol = new List<IdentityRole>();
        return rolManager.Roles.ToList();
    }

    public static void afegirRol(IdentityRole rol)
    {
        try
        {
            rolManager.Create(rol);
        }
        catch (Exception e)
        {

        }
    }

    public static IdentityRole buscarRol(String nomRol)
    {
        IdentityRole rolTrobat = new IdentityRole();

        try
        {
            rolTrobat = rolManager.FindByName(nomRol);
        }
        catch (Exception e)
        {

        }

        return rolTrobat;
    }

    public static void eliminarRol(String nomRol)
    {
        IdentityRole resultat = new IdentityRole();

        try
        {
            resultat = buscarRol(nomRol);
            rolManager.Delete(resultat);
        }
        catch (Exception e)
        {

        }
    }

    public static void modificarRol(IdentityRole rolModificat)
    {
        //IdentityRole resultat = new IdentityRole();
        try
        {
            //resultat = buscarRol(rolModificat.Name);
            rolManager.Update(rolModificat);
        }
        catch (Exception e)
        {

        }
    }
}