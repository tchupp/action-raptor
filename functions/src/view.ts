import {ActionsBlock, DividerBlock, SectionBlock, View} from "@slack/types";


export const markdownSection = (text: string): SectionBlock => {
    return ({
        type: "section",
        text: {
            type: "mrkdwn",
            text: text
        }
    });
};

export const editableActionLine = (text: string, actionId: string): SectionBlock => {
    return ({
        type: "section",
        text: {
            type: "mrkdwn",
            text: text
        },
        accessory: {
            "type": "button",
            "action_id": `complete:${actionId}`,
            "text": {
                "type": "plain_text",
                "text": "Complete",
            }
        }
    });
};

export const listFooter = (): ActionsBlock => {
    return {
        type: "actions",
        elements: [
            {
                type: "button",
                action_id: "add_action_item",
                text: {
                    type: "plain_text",
                    text: "add"
                }
            }
        ]
    }
};

export const addItemModal = (callbackId: string): View => {
    return {
        type: "modal",
        callback_id: callbackId,
        title: {
            type: "plain_text",
            text: "New Action Item",
            emoji: true
        },
        submit: {
            type: "plain_text",
            text: "Add",
            emoji: true
        },
        close: {
            type: "plain_text",
            text: "Cancel",
            emoji: true
        },
        blocks: [
            {
                type: "input",
                block_id: "item_description",
                element: {
                    type: "plain_text_input",
                    action_id: "title",
                    placeholder: {
                        type: "plain_text",
                        text: "What needs done?"
                    }
                },
                label: {
                    type: "plain_text",
                    text: "Description"
                }
            }
        ]
    }
};

export const helpSection = (): SectionBlock => {
    return markdownSection(helpText);
};

export const divider = (): DividerBlock => {
    return {
        type: "divider"
    }
};

const helpText = `usage: /action <command> <options>

Add an action item:
    /action add <item description and owner>
    
List outstanding action items:
    /action list
`;