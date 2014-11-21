using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
/// <summary>
/// Descripció breu de GestioBD
/// </summary>
public static class GestioBD
{
    private static UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();
    private static UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(userStore);

    public static List<IdentityUser> llistaTotsUsuaris()
    {
        List <IdentityUser> lstIdntUser = new List<IdentityUser>();
        return userManager.Users.ToList();
    }

    public static void afegirUsuari(IdentityUser usuari)
    {
        try
        {
            userManager.Create(usuari);
        }
        catch (Exception e)
        { 
            
        }
    }
    
    public static List<IdentityUser> buscarUsuari(String nomUsuari)
    {
        List<IdentityUser> usuariTrobat = new List<IdentityUser>();

        try 
        {
            usuariTrobat.Add(userManager.FindByName(nomUsuari));
        }
        catch(Exception e)
        {

        }

        return usuariTrobat;
    }

    public static void eliminarUsuari(String nomUsuari)
    {
        List<IdentityUser> resultat = new List<IdentityUser>();

        try 
        { 
            resultat = buscarUsuari(nomUsuari);
            userManager.Delete(resultat[0]);
        }
        catch(Exception e)
        {
            
        }
    }

    public static void modificarUsuari(IdentityUser usuariModificat)
    {
        List<IdentityUser> resultat = new List<IdentityUser>();
        try
        {
            resultat = buscarUsuari(usuariModificat.UserName);
            
            if (resultat.Count == 1)
            {
                resultat[0].Email = usuariModificat.Email;

                if (!usuariModificat.PasswordHash.Equals(resultat[0].PasswordHash))
                {
                    resultat[0].PasswordHash = usuariModificat.PasswordHash;                    
                }

                resultat[0].PhoneNumber = usuariModificat.PhoneNumber;

                userManager.Update(resultat[0]);
            }
        }
        catch(Exception e)
        {
            
        }
    }
}