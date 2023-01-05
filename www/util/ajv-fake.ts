function returnTrue(): true {
    return true;
}

type AjvFakeType = {
    compile: () => typeof returnTrue;
};

const ajvFakeInstance: AjvFakeType = {
    compile: function compile() {
        return returnTrue;
    },
};

// eslint-disable-next-line import/no-default-export, @typescript-eslint/no-empty-function
export default function AjvFake(): AjvFakeType {
    return ajvFakeInstance;
}
