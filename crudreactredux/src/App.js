import React, { Component } from "react";
import JumbotronComponent from "./components/JumbotronComponent";
import NavbarComponent from "./components/NavbarComponent";
import TableComponent from "./components/TableComponent";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    title: "GELAP GELAP",
    users: [
      {
        id: 1,
        nama: "olive",
        alamat: "Penggalangan",
        umur: "6",
        nohp: "0812345678",
      },
      {
        id: 2,
        nama: "Jumamu",
        alamat: "Dskolah",
        umur: "8",
        nohp: "08879890977",
      },
      {
        id: 3,
        nama: "chilc",
        alamat: "Dskolah",
        umur: "5",
        nohp: "08456878",
      },
      {
        id: 4,
        nama: "olive",
        alamat: "Penggalangan",
        umur: "6",
        nohp: "0812345678",
      },
      {
        id: 5,
        nama: "Jumamu",
        alamat: "Dskolah",
        umur: "8",
        nohp: "08879890977",
      },
      {
        id: 6,
        nama: "chilc",
        alamat: "Dskolah",
        umur: "5",
        nohp: "08456878",
      },
      {
        id: 7,
        nama: "olive",
        alamat: "Penggalangan",
        umur: "6",
        nohp: "0812345678",
      },
      {
        id: 8,
        nama: "Jumamu",
        alamat: "Dskolah",
        umur: "8",
        nohp: "08879890977",
      },
      {
        id: 9,
        nama: "chilc",
        alamat: "Dskolah",
        umur: "5",
        nohp: "08456878",
      },
      {
        id: 10,
        nama: "olive",
        alamat: "Penggalangan",
        umur: "6",
        nohp: "0812345678",
      },
      {
        id: 11,
        nama: "Jumamu",
        alamat: "Dskolah",
        umur: "8",
        nohp: "08879890977",
      },
      {
        id: 12,
        nama: "chilc",
        alamat: "Dskolah",
        umur: "5",
        nohp: "08456878",
      },
    ],
  };

  render() {
    return (
      <div>
        <NavbarComponent />
        <JumbotronComponent title={this.state.title} />
        <TableComponent users={this.state.users} />
      </div>
    );
  }
}
