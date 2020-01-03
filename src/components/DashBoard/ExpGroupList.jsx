import React, { Component } from "react";
import { List, Avatar, Icon } from "antd";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import {
    setUserExpGroup,
    setGrLoadingFalse,
    setGrLoadingTrue
} from "../../redux";

class ExpGroupList extends Component {
    componentDidMount() {
        this.props.setGrLoadingTrue();
        this.unsubscribe = this.props.firebase
            .expGroupRef()
            .where("users", "array-contains", this.props.userInfo.firstname)
            .onSnapshot(snapshot => {
                let expGroups = [];
                snapshot.forEach(doc => {
                    expGroups.push({ key: doc.id, ...doc.data() });
                });
                this.props.setUserExpGroup(expGroups);
                if (this.props.loading) this.props.setGrLoadingFalse();
            });
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    render() {
        return (
            <List
                loading={this.props.loading}
                itemLayout="horizontal"
                dataSource={this.props.expGropus}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a key={item.key} href="# ">
                                <Icon type="edit" />
                            </a>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf"
                                    }}
                                >
                                    {item.gname[0].toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <a
                                    href={`#${item.key}`}
                                    onClick={() =>
                                        this.props.onGrSelect(item.key)
                                    }
                                >
                                    {item.gname}
                                </a>
                            }
                            description={
                                <div>
                                    {`${item.description} : you and ${item.users
                                        .length - 1} others`}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        userInfo: state.user.userInfo,
        expGropus: state.expGroup.userExpGropus,
        loading: state.expGroup.expGrLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setGrLoadingFalse: () => dispatch(setGrLoadingFalse()),
        setGrLoadingTrue: () => dispatch(setGrLoadingTrue()),
        setUserExpGroup: expenses => dispatch(setUserExpGroup(expenses))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(ExpGroupList));
