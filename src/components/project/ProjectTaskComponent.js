import React from "react";

import { ProjectTasks } from "./ProjectTasks";
import v4 from "uuid";

class ProjectTaskComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            tasksData: props.taskList,
            newBoard: "",
            eventBus: undefined
        };

        this.handleLaneClick = this.handleLaneClick.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.setEventBus = this.setEventBus.bind(this);
        this.handleCreateBoard = this.handleCreateBoard.bind(this);
        this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.modalOpen !== prevState.modalOpen
            ? { modalOpen: nextProps.modalOpen }
            : null;
    }

    handleLaneClick(e) {
        console.log(e);
    }

    handleCardClick(e) {
        console.log(e);
    }

    setEventBus = handle => {
        this.setState({ eventBus: handle });
    };

    handleCreateBoard() {
        if (this.state.newBoard === "") return;

        let boards = Object.assign({}, this.state.tasksData);
        boards.lanes.push({
            id: v4(),
            title: this.state.newBoard,
            label: "",
            cards: []
        });

        this.setState({ tasksData: boards });
        console.log(this.state.eventBus);
        this.state.eventBus.publish({ type: "UPDATE_LANES", lanes: boards.lanes });
        this.props.onToggleModal();
    }

    handleBoardNameChange(e) {
        this.setState({ newBoard: e.target.value });
    }

    render() {
        return (
            <ProjectTasks
                data={this.state.tasksData}
                eventBusHandle={this.setEventBus}
                onLaneClick={this.handleLaneClick}
                onCardClick={this.handleCardClick}
                modalOpen={this.state.modalOpen}
                onBoardNameChange={this.handleBoardNameChange}
                onCreateBoard={this.handleCreateBoard}
                onToggleModal={this.props.onToggleModal}
            />
        );
    }
}

export default ProjectTaskComponent;