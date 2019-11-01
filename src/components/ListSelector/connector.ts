import { connect, Dispatch } from "react-redux";
import { ApplicationAction } from "../../actions/actions";
import { createListAction, getListRequestAction } from "../../actions/listActions";
import { Link } from "../../api/api";
import { List, ListForm } from "../../api/list";
import { ApplicationState } from "../../store";
import ListSelector from "./ListSelector";

export const mapStateToProps = (state: ApplicationState, ownProps: { selectedList: List }) =>
    ({
        createListLink: state.links.createList,
        selectedList: ownProps.selectedList,
        listOptions: state.listOptions,
    });

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => ({
    createListAction: (link: Link, list: ListForm) => dispatch(createListAction(link, list)),
    getListAction: (link: Link) => dispatch(getListRequestAction(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSelector);
