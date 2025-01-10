import * as ensure from '@commitlint/ensure'
import message from '@commitlint/message'
import type { Plugin, Rule } from '@commitlint/types'
import { getPackagesSync } from '@manypkg/get-packages'
import type { Commit } from 'conventional-commits-parser'

const scopeEnum: Rule<{ stripPrefix?: string[], extra?: string[] }> = (parsed, when = 'always', value = {}) => {
    const { stripPrefix = [], extra = [] } = value
    if (!parsed.scope) {
        return [true, '']
    }
    let packages = getPackages(parsed)
    packages = packages.map(pkg => {
        for (const px of stripPrefix)
            if (pkg.startsWith(px)) {
                return pkg.substring(px.length)
            }
        return pkg
    })
    const scopes = extra.concat(packages)
    const negated = when === 'never'
    const result = ensure.enum(parsed.scope, scopes)
    return [
        negated ? !result : result,
        message([
            'scope must',
            negated ? 'not' : null,
            `be one of [${scopes.join(', ')}]`
        ])
    ]
}

const plugin: Plugin = {
    rules: {
        'scope-enum': scopeEnum
    }
}

function getPackages(context: Commit) {
    const cwd = context.cwd || process.cwd()
    const packages = getPackagesSync(cwd)
    return packages.packages.map((p) => p.packageJson.name)
}

export default plugin
