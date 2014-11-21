<%@ Page Title="" Language="C#" MasterPageFile="~/Principal.master" AutoEventWireup="true" CodeFile="Rols.aspx.cs" Inherits="Rols" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CntntHldrSection" Runat="Server">
    <asp:Panel ID="panelRols" runat="server">
        <header>
            <p>Rols</p>
        </header>
        <asp:Panel ID="panelLlistaRols" CssClass="panelsRols" runat="server">
            <asp:ImageButton ID="bttnAltaRol" runat="server" ImageUrl="~/Imatges/add_user.png" OnClick="bttnAltaRol_Click" />
            <asp:Label ID="lblMissatgesRol" runat="server" Text=""></asp:Label>
            <br />
            <br />
            <asp:GridView ID="grdvwRols" runat="server" AutoGenerateColumns="False" OnRowDeleting="grdvwRols_RowDeleting" OnSelectedIndexChanging="grdvwRols_SelectedIndexChanging">
                <Columns>
                    <asp:CommandField ButtonType="Image" DeleteImageUrl="~/Imatges/remove_user_32.png" ShowDeleteButton="True" />
                    <asp:CommandField ButtonType="Image" SelectImageUrl="~/Imatges/edit_user_32.png" ShowSelectButton="True" />
                    <asp:BoundField DataField="Name" HeaderText="Rol" />
                </Columns>
            </asp:GridView>
        </asp:Panel>
        <asp:Panel ID="panelUnRol" CssClass="panelsRols" runat="server">
            <header>
                <asp:Label ID="lblTitolRol" runat="server" Text=""></asp:Label>
            </header>
            <asp:Label ID="lblRol" runat="server" Text="Rol"></asp:Label>
            <asp:TextBox ID="txtbxRol" CssClass="txtbx" runat="server"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RqrdFldVldtr" ControlToValidate="txtbxRol" runat="server" ErrorMessage="*Camp requerit"></asp:RequiredFieldValidator>
            <br />
            <asp:Panel ID="panelRolEquerra" CssClass="panelsAssDesRols" runat="server">
                <header>
                    <p>Usu. assignats</p>
                </header>
                <asp:ListBox ID="lstbxUsuAsigRol" CssClass="lstbx" runat="server" SelectionMode="Multiple"></asp:ListBox>
            </asp:Panel>
            <asp:Panel ID="panelBotonsAgregar" CssClass="panelsAssDesRols panelBotonsAgregar" runat="server">
                <asp:Button ID="bttnDessasignar" CssClass="bttns" runat="server" Text=">>" OnClick="bttnDessasignar_Click" />
                <br />
                <asp:Button ID="bttnAssignar" CssClass="bttns" runat="server" Text="<<" OnClick="bttnAssignar_Click" />
            </asp:Panel>
            <asp:Panel ID="panelRolDreta" CssClass="panelsAssDesRols" runat="server">
                <header>
                    <p>Usu. possibles</p>
                </header>
                <asp:ListBox ID="lstbxUsuPossRol" runat="server" CssClass="lstbx" SelectionMode="Multiple"></asp:ListBox>
            </asp:Panel>
            <asp:Panel ID="panelBotons" runat="server" CssClass="panelBotons">
                <asp:ImageButton ID="imgBttnAcceptar" runat="server" ImageUrl="~/Imatges/accept_48.png" ToolTip="Acceptar" OnClick="imgBttnAcceptar_Click" />
                <asp:ImageButton ID="imgBttnCancelar" runat="server" CausesValidation="False" ImageUrl="~/Imatges/cancel_48.png" ToolTip="Cancelar" OnClick="imgBttnCancelar_Click" />
            </asp:Panel>
        </asp:Panel>
    </asp:Panel>
</asp:Content>

