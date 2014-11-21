<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Peticio.aspx.cs" Inherits="Peticio" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="estils/estilo.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="tot">
        
        <!-- Inici header -->    
        <header>
            <div id="logo"></div>
            <div id="data">
                <asp:Calendar ID="calendari" runat="server">
                    <TitleStyle CssClass="titolCalendari"/>
                </asp:Calendar>
            </div>
        </header>

        <!-- Fi header -->

        <!-- Primera section -->
        <section>
            <header>
                <p>Dades alumne</p>
            </header>
            <article>
                <asp:Label ID="Label1" CssClass="label" runat="server" Text=" Cognoms"></asp:Label>
                <asp:TextBox ID="txtbxCognoms" CssClass="textBox" runat="server" style="margin-bottom: 0px"></asp:TextBox>
                <asp:RequiredFieldValidator ID="reqFldValCognoms" CssClass="validator" runat="server" ErrorMessage="*Camp requerit" ControlToValidate="txtbxCognoms"></asp:RequiredFieldValidator>
                <br />
                <asp:Label ID="Label2" CssClass="label" runat="server" Text="Nom"></asp:Label>
                <asp:TextBox ID="txtbxNom" CssClass="textBox" runat="server" style="margin-bottom: 0px"></asp:TextBox>
                <asp:RequiredFieldValidator ID="reqFldValNom" CssClass="validator" runat="server" ErrorMessage="*Camp requerit" ControlToValidate="txtbxNom"></asp:RequiredFieldValidator>
            </article>
        </section>
        <!-- Fi primera section -->
        
        <!-- Segona section -->
        <section>
            <header>
                <p>Mòdul professional a cursar</p>
            </header>
            <article>
                <asp:Label ID="Label3" CssClass="label" runat="server" Text="Mòdul professional"></asp:Label>
                <asp:DropDownList ID="drpdpwnlstModul" CssClass="dropDownList" runat="server">
                    <asp:ListItem>(seleccionar)</asp:ListItem>
                    <asp:ListItem>DAW</asp:ListItem>
                    <asp:ListItem>DIW</asp:ListItem>
                    <asp:ListItem>DWEC</asp:ListItem>
                    <asp:ListItem>DWS</asp:ListItem>
                    <asp:ListItem>ED</asp:ListItem>
                    <asp:ListItem>P2</asp:ListItem>
                    <asp:ListItem>PRO</asp:ListItem>
                </asp:DropDownList>
                <asp:CheckBoxList ID="chkbxlstUfs" runat="server" RepeatDirection="Horizontal" Height="29px" Width="549px">
                    <asp:ListItem>UF1</asp:ListItem>
                    <asp:ListItem>UF2</asp:ListItem>
                    <asp:ListItem>UF3</asp:ListItem>
                    <asp:ListItem>UF4</asp:ListItem>
                    <asp:ListItem>UF5</asp:ListItem>
                    <asp:ListItem>UF6</asp:ListItem>
                </asp:CheckBoxList>
            </article>
        </section>
        <!-- Fi segona section -->

        <!-- Tercera i quarta section mateix nivell -->

        <!-- Tercera section -->
        <section id="cursMatriculat">
            <header>
                <p>Curs on està matriculat</p>
            </header>
            <article>
                <asp:Label ID="Label4" CssClass="label" runat="server" Text="Torn"></asp:Label>
                <asp:RadioButtonList ID="rdbtnlstTornEsta" CssClass="textBox" runat="server" RepeatDirection="Horizontal" EnableTheming="True" AutoPostBack="True" OnSelectedIndexChanged="rdbtnlstTornEsta_SelectedIndexChanged">
                    <asp:ListItem Selected="True" Value="Mati">Matí</asp:ListItem>
                    <asp:ListItem>Tarda</asp:ListItem>
                </asp:RadioButtonList>
                <br />
                <asp:Label ID="Label5" CssClass="label" runat="server" Text="Curs"></asp:Label>
                <asp:DropDownList ID="drpdpwnlstCursMat" CssClass="dropDownList" runat="server">
                </asp:DropDownList>
                <br />
                <asp:Label ID="Label6" CssClass="label" runat="server" Text="Tutor"></asp:Label> 
                <asp:DropDownList ID="drpdpwnlstTutorMat" CssClass="dropDownList" runat="server">
                    <asp:ListItem>(seleccionar)</asp:ListItem>
                    <asp:ListItem>Domingo, Antonio</asp:ListItem>
                    <asp:ListItem>Fernández, Francisco</asp:ListItem>
                    <asp:ListItem>Galcerà, Xavier</asp:ListItem>
                    <asp:ListItem>García, Jose Luis</asp:ListItem>
                    <asp:ListItem>Ríos, Àlex</asp:ListItem>
                    <asp:ListItem>Segura, Consuelo</asp:ListItem>
                </asp:DropDownList>
                <br />
                <asp:Label ID="Label7" CssClass="label" runat="server" Text="Professor"></asp:Label>
                <asp:DropDownList ID="drpdpwnlstProfessorMat" CssClass="dropDownList" runat="server">
                    <asp:ListItem>(seleccionar)</asp:ListItem>
                    <asp:ListItem>Domingo, Antonio</asp:ListItem>
                    <asp:ListItem>Fernández, Francisco</asp:ListItem>
                    <asp:ListItem>Galcerà, Xavier</asp:ListItem>
                    <asp:ListItem>García, Jose Luis</asp:ListItem>
                    <asp:ListItem>Méndez, Urbano</asp:ListItem>
                    <asp:ListItem>Ríos, Àlex</asp:ListItem>
                    <asp:ListItem>Segura, Consuelo</asp:ListItem>
                    <asp:ListItem>Serrano, Joan</asp:ListItem>
                    <asp:ListItem>Sotorra, Miquel</asp:ListItem>
                </asp:DropDownList>
            </article>
        </section>
        <!-- Fi tercera section -->

        <!-- Inici quarta section -->
        <section id="cursNou">
            <header>
                <p>Curs on vol anar</p>
            </header>
            <article>
                <asp:Label ID="Label8" CssClass="label" runat="server" Text="Torn"></asp:Label>
                <asp:RadioButtonList ID="rdbtnlstTornVol" CssClass="textBox" runat="server" RepeatDirection="Horizontal" AutoPostBack="True" OnSelectedIndexChanged="rdbtnlstTornVol_SelectedIndexChanged">
                    <asp:ListItem Selected="True" Value="Mati">Matí</asp:ListItem>
                    <asp:ListItem>Tarda</asp:ListItem>
                </asp:RadioButtonList>
                <br />
                <asp:Label ID="Label9" CssClass="label" runat="server" Text="Curs"></asp:Label>
                <asp:DropDownList ID="drpdwnlstCursNou" CssClass="dropDownList" runat="server">
                </asp:DropDownList>
                <br />
                <asp:Label ID="Label10" CssClass="label" runat="server" Text="Tutor"></asp:Label>
                <asp:DropDownList ID="drpdwnlstTutorNou" CssClass="dropDownList" runat="server">
                    <asp:ListItem>(seleccionar)</asp:ListItem>
                    <asp:ListItem>Domingo, Antonio</asp:ListItem>
                    <asp:ListItem>Fernández, Francisco</asp:ListItem>
                    <asp:ListItem>Galcerà, Xavier</asp:ListItem>
                    <asp:ListItem>García, Jose Luis</asp:ListItem>
                    <asp:ListItem>Ríos, Àlex</asp:ListItem>
                    <asp:ListItem>Segura, Consuelo</asp:ListItem>
                </asp:DropDownList>
                <br />
                <asp:Label ID="Label11" CssClass="label" runat="server" Text="Professor"></asp:Label>
                <asp:DropDownList ID="drpdwnlstProfessorNou" CssClass="dropDownList" runat="server">
                    <asp:ListItem>(seleccionar)</asp:ListItem>
                    <asp:ListItem>Domingo, Antonio</asp:ListItem>
                    <asp:ListItem>Fernández, Francisco</asp:ListItem>
                    <asp:ListItem>Galcerà, Xavier</asp:ListItem>
                    <asp:ListItem>García, Jose Luis</asp:ListItem>
                    <asp:ListItem>Méndez, Urbano</asp:ListItem>
                    <asp:ListItem>Ríos, Àlex</asp:ListItem>
                    <asp:ListItem>Segura, Consuelo</asp:ListItem>
                    <asp:ListItem>Serrano, Joan</asp:ListItem>
                    <asp:ListItem>Sotorra, Miquel</asp:ListItem>
                </asp:DropDownList>
            </article>
        </section>

        <asp:Button ID="btnAfegirResum" cssClass="button" runat="server" Text="Afegir resum" OnClick="btnAfegirResum_Click" />
        <asp:Label ID="lblMissatges" runat="server" CssClass="validator"></asp:Label>

        <!-- Cinquena section -->
        <section id="resum">
            <header>
                <p>Resum</p>
            </header>
            <article>
                <asp:Button ID="btnEliminarSel" cssClass="button" runat="server" Text="Eliminar seleccionats" OnClick="btnEliminarSel_Click" CausesValidation="False" />
                <asp:Button ID="btnEliminarTot" cssClass="button" runat="server" Text="Eliminar tots" OnClick="btnEliminarTot_Click" CausesValidation="False" />
                <br />
                <asp:ListBox ID="lstbxResum" runat="server" Rows="20" SelectionMode="Multiple" Width="940px"></asp:ListBox>
            </article>
        </section>
        <!-- Fi cinquena section -->

    </div>
    </form>
</body>
</html>
