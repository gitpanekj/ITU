import { Mark } from '@tiptap/core';

export const QuestionSelection = Mark.create({
    name: 'questionSelection',

    // does not vary per instance
    addOptions(){return {};},

    // may vary per instance
    addAttributes(){
        return {
            default: null,
            parseHTML: (element) => element.getAttribute('question-id'),
            renderHTML: (attributes) => {
                if (!attributes.questionId){
                    return {};
                }

                return {
                    'question-id': attributes.questionId,
                };
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

    renderHTML({ mark, HTMLAttributes }){
        console.log(mark);
        return ['span', {'question-id': 'blue'}, 0]
    },


    addCommands() {
        return {
          setCustomHighlight: () => ({ commands }) => {
            return commands.setMark(this.name); // Apply the custom highlight
          },
          unsetCustomHighlight: () => ({ commands }) => {
            return commands.unsetMark(this.name); // Remove the custom highlight
          },
        };
    },

});