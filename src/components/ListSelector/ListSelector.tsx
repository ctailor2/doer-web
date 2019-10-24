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
import { createListAction } from '../../actions/listActions';
import { Link } from '../../api/api';
import { List } from "../../api/list";

interface Props {
    selectedList: List;
    createListLink: Link;
    createListAction: typeof createListAction;
}

interface State {
    createListModalOpen: boolean;
    newListName?: string;
}

export default ({ selectedList, createListLink, ...props }: Props, state: State) => {
    const [createListModalOpen, setCreateListModalOpen] = useState(false);
    const [newListName, setNewListName] = useState<string | undefined>(undefined);
    const buttonIsDisabled = newListName === undefined || newListName.match(/\w+/) === null;
    return (<>
        <FormGroup bsSize="large">
            <DropdownButton id="list-dropdown-button" title={selectedList.profileName}>
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