import React from 'react';
import { MainLayout } from "../../layout/MainLayout";
import SongList from "../../components/SongList.js";
import { Constants } from "../../utils/Constants";
import { withToken } from "../../axios/instance/auth";
import { withRouter } from "react-router-dom";

const initState = {
	songs: [],
	isFetching: false,
	isSkipping: true,
	networkError: false,
	hasError: false,
};

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {...initState};
  }

  async componentDidMount() {
		const { history, handleLogout } = this.props;
		try {
			this.setState({
				isFetching: true,
			});
			const { data } = await withToken.get("/api/v1/song/all", {
				headers: {
					Authorization: localStorage.getItem(Constants.TOKEN),
				},
			});
			const songs = data;
			this.setState({
				isFetching: false,
				songs,
			});
		} catch (e) {
			let response;
			try {
				response = e.response;
				response = response.status;
			} catch (e) {
				this.setState({
					isFetching: false,
					hasError: true,
				});
				return;
			}
			switch (response) {
				case 403:
					handleLogout();
					history.push("/login");
					break;
				default:
					this.setState({
						isFetching: false,
						networkError: true,
					});
					break;
			}
		}
	}

  render(){
    const {songs} = this.state;
    return(
      <MainLayout title="Set up">
        <SongList list={songs}/>
      </MainLayout>
    );
  }
}

export default withRouter(Main);
