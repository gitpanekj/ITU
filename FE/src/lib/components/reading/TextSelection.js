import { Mark } from '@tiptap/core';

export const QuestionSelection = Mark.create({
    name: 'questionSelection',

    // does not vary per instance
    addOptions(){return {};},

    // may vary per instance
    addAttributes() {
        return {
            questionId: {
                default: null,
                parseHTML: element => element.getAttribute('question-id'),
                renderHTML: attributes => {
                    if (!attributes.questionId) return {};
                    return {
                        'question-id': attributes.questionId
                    };
                },
            },

            highlighted: {
                default: false,
                parseHTML: (element) => element.getAttribute('highlighted') === 'true',
                renderHTML: (attributes) => {
                    return attributes.highlighted ? { style: 'background-color: yellow;' } : {};
                },
            },
        };
    },

    parseHTML(){
        return [
            {
                tag: 'span[question-id]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }){
        return ['span', {...HTMLAttributes}, 0]
    },


    addCommands() {
        return {
          setCustomHighlight: (id) => ({ commands }) => {
            return commands.setMark(this.name, {questionId: id, highlighted: false}); // Apply the custom highlight
          },
          unsetCustomHighlight: () => ({ commands }) => {
            return commands.unsetMark(this.name); // Remove the custom highlight
          },
        };
    },

});