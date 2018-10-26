import * as _ from 'lodash';

export function flattenMyTree(tree: any, childProperty = 'children') {
  function recurse(nodes: any, path: string[]): any {
    return _.map(nodes, function(node) {
      var newPath = _.union(path, [node.name]);
      return [
        _.assign(
          { pathname: newPath.join(' > '), level: path.length },
          _.omit(node, childProperty)
        ),
        recurse(node[childProperty], newPath),
      ];
    });
  }
  return _.flattenDeep(recurse(tree, []));
}
