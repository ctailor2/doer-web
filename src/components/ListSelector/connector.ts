import { connect, Dispatch } from "react-redux";
import { ApplicationAction } from "../../actions/actions";
import { createListAction, getListRequestAction } from "../../actions/listActions";
import { Link } from "../../api/api";
import { ListName } from "../../api/list";
import { ApplicationState } from "../../store";
import ListSelector from "./ListSelector";

export const mapStateToProps = (state: ApplicationState, ownProps: { selectedList: string }) =>
    ({
        createListLink: state.links.createList,
        selectedList: ownProps.selectedList,
        listOptions: state.listOptions,
    });

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => ({
    createListAction: (link: Link, list: ListName) => dispatch(createListAction(link, list)),
    getListAction: (name: string, link: Link) => dispatch(getListRequestAction(name, link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSelector);
