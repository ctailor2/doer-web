import React, { ChangeEvent, useState } from 'react';
import {
    Button,
    DropdownButton,
    FormControl,
    FormGroup,
    Glyphicon,
    MenuItem,
    Modal,
} from "react-bootstrap";
import { createListAction, getListRequestAction } from '../../actions/listActions';
import { Link } from '../../api/api';
import { ListOption } from "../../api/list";

interface Props {
    listOptions: ListOption[];
    selectedList: string;
    createListLink: Link;
    createListAction: typeof createListAction;
    getListAction: typeof getListRequestAction;
}

interface State {
    createListModalOpen: boolean;
    newListName?: string;
}

export default ({ listOptions, selectedList, createListLink, ...props }: Props, state: State) => {
    const [createListModalOpen, setCreateListModalOpen] = useState(false);
    const [newListName, setNewListName] = useState<string | undefined>(undefined);
    const buttonIsDisabled = newListName === undefined || newListName.match(/\w+/) === null;
    return (<>
        <FormGroup bsSize="large">
            <DropdownButton id="list-dropdown-button" title={selectedList}>
                {renderListOptions(listOptions, selectedList, props.getListAction)}
                <MenuItem onClick={() => setCreateListModalOpen(!createListModalOpen)}>
                    <Glyphicon glyph="plus-sign" />
                    &nbsp;New List
                </MenuItem>
            </DropdownButton>
        </FormGroup>
        <Modal onHide={() => setCreateListModalOpen(false)} show={createListModalOpen}>
            <Modal.Header closeButton>
                <Modal.Title>Create a New List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    type="text"
                    onChange={(event: ChangeEvent<FormControl & HTMLInputElement>) =>
                        setNewListName(event.target.value)
                    }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    disabled={buttonIsDisabled}
                    bsStyle="primary"
                    onClick={() => {
                        if (newListName !== undefined) {
                            props.createListAction(createListLink, { name: newListName });
                        }
                        setCreateListModalOpen(false);
                    }}>Submit</Button>
            </Modal.Footer>
        </Modal>
    </>);
};

function renderListOptions(
    listOptions: ListOption[],
    selectedListName: string,
    action: typeof getListRequestAction): React.ReactNode {
    return listOptions.map((listOption) =>
        (<MenuItem
            key={listOption.name}
            onClick={() => action(listOption.name, listOption._links.list)}
            active={listOption.name === selectedListName}>
            {listOption.name}
        </MenuItem>));
}
