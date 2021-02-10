import React from "react";
import axios from "axios";

class Productions extends React.Component {
  state = {
    thumbnail_list: "",
    loading: true
  }

  async componentDidMount() {
    const pathname = this.props.location.pathname;
    console.log(pathname);
    try {
      const {data} = await axios.get(`http://localhost:3001/api${pathname}`);
      console.log(data[0]);
    } catch(err) {
      console.error(err);
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { thumbnail_list, loading } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>hi</h1>
        {loading 
        ? null
        : <img src={`/productions/${thumbnail_list}`} alt=""/>}
      </div>
    )
  }
}

export default Productions;