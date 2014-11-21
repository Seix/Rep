<%@ Page Title="" Language="C#" MasterPageFile="~/Principal.master" AutoEventWireup="true" CodeFile="Usuaris.aspx.cs" Inherits="Usuaris" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CntntHldrSection" Runat="Server">
    <asp:Panel ID="PanelUsuari" CssClass="panels" runat="server">
        <header>
            <asp:Label ID="lblTitol" CssClass="simplelbl" runat="server" Text="Títol"></asp:Label>
        </header>
        <asp:Label ID="lblNonUsuari" CssClass="simplelbl" runat="server" Text="Nom usuari"></asp:Label>
        <asp:TextBox ID="txtbxNomUsuari" CssClass="txtbx" runat="server" ToolTip="Nom d'usuari"></asp:TextBox> 
        <asp:RequiredFieldValidator ID="fldVldtrNomUsuari" CssClass="errorlbl" runat="server" ErrorMessage="*Camp requerit" ControlToValidate="txtbxNomUsuari" ValidationGroup="nouUsuariGrup"></asp:RequiredFieldValidator>
        <br/>
        <asp:Label ID="lblContrasena" CssClass="simplelbl" runat="server" Text="Contrasenya"></asp:Label>
        <asp:TextBox ID="txtbxContrasena" CssClass="txtbx" runat="server" TextMode="Password" ToolTip="Contrasenya"></asp:TextBox>
        <asp:RequiredFieldValidator ID="fldVldtrContrasena" CssClass="errorlbl" runat="server" ControlToValidate="txtbxContrasena" ErrorMessage="*Camp requerit" ValidationGroup="nouUsuariGrup"></asp:RequiredFieldValidator>
        <br/>
        <asp:Label ID="lblConfContrasena" CssClass="simplelbl" runat="server" Text="Confirmar contrasenya"></asp:Label>
        <asp:TextBox ID="txtbxConfContrasena" CssClass="txtbx" runat="server" TextMode="Password" ToolTip="Confirmació contrasenya"></asp:TextBox>
        <asp:CompareValidator ID="cmprVldtrContrasena" runat="server" CssClass="errorlbl" ErrorMessage="*Les contrasenyes no coincideixen" ControlToCompare="txtbxContrasena" ControlToValidate="txtbxConfContrasena" ValidationGroup="nouUsuariGrup"></asp:CompareValidator>
        <br/>
        <asp:Label ID="lblCorreuE" runat="server" CssClass="simplelbl" Text="Correu electrònic"></asp:Label>
        <asp:TextBox ID="txtbxCorreuE" runat="server" CssClass="txtbx" ToolTip="Correu electrònic"></asp:TextBox>
        <asp:RequiredFieldValidator ID="fldVldtrCorreuE" CssClass="errorlbl" runat="server" ControlToValidate="txtbxCorreuE" ErrorMessage="*Camp requerit" ValidationGroup="nouUsuariGrup"></asp:RequiredFieldValidator>
        <br/>
        <asp:Label ID="lblTelefon" CssClass="simplelbl" runat="server" Text="Telèfon"></asp:Label>
        <asp:TextBox ID="txtbxTelefon" CssClass="txtbx" runat="server" ToolTip="Telèfon"></asp:TextBox>
        <br/>
        <asp:ImageButton ID="imgBttnAcceptar" runat="server" ImageUrl="~/Imatges/accept_48.png" OnClick="imgBttnAcceptar_Click" ToolTip="Acceptar" ValidationGroup="nouUsuariGrup" />
        <asp:ImageButton ID="imgBttnCancelar" runat="server" CausesValidation="False" ImageUrl="~/Imatges/cancel_48.png" OnClick="imgBttnCancelar_Click" ToolTip="Cancelar" />
        <asp:Label ID="lblMissatgesUsuari" CssClass="simplelbl" runat="server" Text=""></asp:Label>
    </asp:Panel>
    <asp:Panel ID="PanelUsuaris" CssClass="panels" runat="server">
        <header>
            <p>Tots els usuaris</p>
        </header>
        <asp:ImageButton ID="imgBttnAltaUsuari" runat="server" ImageUrl="~/Imatges/add_user.png" OnClick="imgBttnAltaUsuari_Click" ToolTip="Nou usuari"></asp:ImageButton>
        <asp:Label ID="lblMissatgesUsuaris" CssClass="simplelbl" runat="server" Text=""></asp:Label>
        <br/>
        <br/>
        <asp:GridView ID="grdvwUsuaris" runat="server" AutoGenerateColumns="False" OnRowDeleting="grdvwUsuaris_RowDeleting" OnSelectedIndexChanging="grdvwUsuaris_SelectedIndexChanging">
            <Columns>
                <asp:CommandField ButtonType="Image" DeleteImageUrl="~/Imatges/remove_user_32.png" ShowDeleteButton="True" />
                <asp:CommandField ButtonType="Image" SelectImageUrl="~/Imatges/edit_user_32.png" ShowSelectButton="True" SelectText="Modificar" />
                <asp:BoundField DataField="id" HeaderText="Identificador" Visible="False" />
                <asp:BoundField DataField="UserName" HeaderText="Usuari" />
                <asp:BoundField DataField="Email" HeaderText="Correu electrònic" />
                <asp:BoundField DataField="PhoneNumber" HeaderText="Telèfon" />
            </Columns>
        </asp:GridView>
    </asp:Panel>
</asp:Content>

