var utils = (function ()
{
    
    //Funci�n para convertir un array de enteros introducida a numeros romanos
    function convertToRoman(texto)
    {
        var filaCon = [];
        for (var i = 0; i < texto.length; i++)
        {
            filaCon.push(numToRoman(texto[i]));
        }
        return filaCon;
    }
    
    //Funci�n que recibe un entero y lo muetra como n�mero romano (0-9) = (I-X)
    function numToRoman(num)
    {
        var val;
        if(num == 0 || num == "0")
        {
            val = "no";
        }
        else if(num == 1 || num == "1")
        {
            val = "I";
        }
        else if(num == 2 || num == "2")
        {
            val = "II";
        }
        else if(num == 3 || num == "3")
        {
            val = "III";
        }
        else if(num == 4 || num == "4")
        {
            val = "IV";
        }
        else if(num == 5 || num == "5")
        {
            val = "V";
        }
        else if(num == 6 || num == "6")
        {
            val = "VI";
        }
        else if(num == 7 || num == "7")
        {
            val = "VII";
        }
        else if(num == 8 || num == "8")
        {
            val = "VIII";
        }
        else if(num == 9 || num == "9")
        {
            val = "IX";
        }
   
        return val;
    }

    return{
        pub_convertToRoman: convertToRoman,
        pub_numToRoman: numToRoman
    }
}());


/*

Nombre y Apellido
Patr�n:
/^[A-Za-z������]{2,}([\s][A-Za-z������]{2,})+$/
 

Descripci�n: Con ^ le decimos que debe empezar a buscar al principio del String. Estaremos buscando caracteres 
alfab�ticos en may�scula y min�scula con A-Za-z. Como hablamos espa�ol, es necesario agregar aquellos caracteres
 especiales como tildes y �. {2,} se asegura que por lo menos debe tener dos letras. Entre par�ntesis: 
 con [\s] le decimos que habr� un espacio entre las dos palabras y a continuaci�n se repite el proceso de buscar 
 caracteres alfab�ticos. Fuera del par�ntesis, el signo de m�s (+) indica que el grupo que lo precede tiene que 
 aparecer por lo menos una vez. El signo de pesos al final del patr�n indica que debe buscar al final de la linea.
Nombre de usuario
Patr�n:
/^[a-z0-9_-]{3,15}$/
 

Descripci�n: Con el acento circunflejo (^) indicamos que debe empezar a buscar al comienzo del String caracteres 
alfanum�ricos  gui�n o gui�n bajo. {3, 15} le dice que debe tener entre 3 y 15 caracteres.
 

E-mail
Patr�n:
/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
 

Descripci�n: Con el acento circunflejo (^) indicamos que debe empezar a buscar al comienzo del String. 
En el primer grupo buscamos caracteres alfanum�ricos  gui�n, gui�n bajo y puntos; con el signo de m�s (+) 
indicamos que el grupo que lo precede debe aparecer por lo menos una vez. A continuaci�n colocamos el arroba 
y creamos un segundo grupo buscar�  caracteres alfanum�ricos, puntos o guiones. \. nos indica que debe 
haber un punto. En el tercer grupo buscaremos caracteres alfab�ticos y puntos que tengan entre 2 y 6 caracteres.
 

Contrase�a
Patr�n:
/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,20}.+$)/
 

Descripci�n: Lo que hacemos en este patr�n es buscar que tenga por lo menos una letra en may�scula, 
una letra en min�scula y un n�mero y que su longitud sea entre 6 y 20 caracteres. Esto es para asegurarnos 
que la contrase�a sea segura.


http://www-aii.dyndns.org/aii/index.php


D.N.I.: ^\d{1,8}$
Entero: ^(?:\+|-)?\d+$
Real: ^(?:\+|-)?\d+\.\d*$
Hora: ^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$
Fecha: ^([0][1-9]|[12][0-9]|3[01])(/|-)(0[1-9]|1[012])\2(\d{4})$
E-mail: (^[0-9a-zA-Z]+(?:[._][0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\.[0-9a-zA-Z]{2,3})$


Patrones para expresiones regulares

c	Caracter c no especial. Casa consigo mismo.	
\c	Caracter especial c (\: car�cter de escape).	
^X	Comenzar con X.
X$	Finalizar con X.	
X*	X cero o m�s veces.	
.	Un caracter indivudual cualquiera.
[c1c2c3]	Conjunto de caracteres. Casa si c1 o c2 o c3.	
[^c1c2c3]	Casa con caracteres distintos de c1, c2 o c3.	
[c1-c2]	Rango de caracteres. Casa con cualquier caracter entre c1 y c2.
[^c1-c2]	Casa con caracteres no comprendidos entre c1 y c2.
XY	Concatenaci�n. Casa si X va seguido de Y.	
X+	X una o m�s veces.
X?	X cero o una vez.	
(X)	Agrupa X. (Adem�s, en JavaScript, graba en RegExp.$1...).	
X|Y	Alternativa. Casa X o Y.
X{n}	X exactamente n veces.	
X{n,}	X al menos n veces.	
X{m,n}	X de m a nveces.
"cad"	Literal. Ignora los caracteres especiales de cad. (No se puede utilizar en JavaScript)	
(?:X)	Casa X pero no lo captura.	
X(?=Y)	Casa X si va seguido de Y.
X(?!=Y)	Casa X si no va seguido de Y.	
X\b	X al final de una palabra.	
X\B	X no est� al final de una palabra.
\ctec	Car�cter de control Ctrl+tec.	
\d	Car�cter num�rico. Equivale a [0-9].	
\D	Car�cter no num�rico. Equivale a [^0-9].
\s	Espacio en blanco (separador). Equivale a [\f\n\r\t\v].	
\S	Espacio no blanco (separador). Equivale a [^\f\n\r\t\v].	
\w	Car�cter alfanum�rico. Equivale a [A-Za-z0-9_].
\W	Car�cter no alfanum�rico. Equivale a [^A-Za-z0-9_].	
\num	Referencia atras a subcadenas capturadas (num entero).	
\xhh	Car�cter cuyo c�digo en hexadecimal es hh.

*/