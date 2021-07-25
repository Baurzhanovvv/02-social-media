import { connect } from "react-redux";
import { follow, unFollow, toggleFollowingProgress, getUsersThunkCreator, followOrUnFollowThunkCreator } from "../../../redux/usersReducer";
import React from "react";
import UsersList from "./usersList";
import Preloader from "../../commons/preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../../redux/usersSelector";


class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pages) => {
        this.props.getUsersThunkCreator(pages, this.props.pageSize)
        
    }

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader /> : null}
            <UsersList
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}
                followOrUnFollowThunkCreator={this.props.followOrUnFollowThunkCreator}
                isAuth={this.props.isAuth}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

let Compose = compose(connect(mapStateToProps, {
    follow,
    unFollow,
    toggleFollowingProgress,
    getUsersThunkCreator,
    followOrUnFollowThunkCreator
}))(UsersAPIComponent);

export default Compose;