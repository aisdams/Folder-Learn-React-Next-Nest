import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, NavbarComponent, ListCategories, Menus } from "./components";
import { API_URL } from "./utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
      
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                showConfirmButton: false,
                timer: 1500,
              });
            })

        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-4">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col>
                <h4>
                  <strong>Daftar Product</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
