// This middleware will just add the property "async dispatch"
// to actions with the "async" property set to true
export default (store: any) => (next: any) => {
    return (action: any) => {
        let syncActivityFinished = false;
        let actionQueue: any = [];

        function flushQueue() {
            actionQueue.forEach((a: any) => store.dispatch(a)); // flush queue
            actionQueue = [];
        }

        function asyncDispatch(asyncAction: any) {
            actionQueue = actionQueue.concat([asyncAction]);

            if (syncActivityFinished) {
                flushQueue();
            }
        }

        const actionWithAsyncDispatch =
            Object.assign({}, action, {asyncDispatch});

        const res = next(actionWithAsyncDispatch);

        syncActivityFinished = true;
        flushQueue();

        return res;
    };
};