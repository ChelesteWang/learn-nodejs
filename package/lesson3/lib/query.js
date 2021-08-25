const Table = require('cli-table')

function query(dists) {
  const keys = Object.keys(dists[0])
  const table = new Table({
    head: keys
  })

  return dists
    .reduce((res, item) => {
      table.push(
        Object.values(item)
      )
      return res
    }, table)
    .toString()
}

module.exports = query