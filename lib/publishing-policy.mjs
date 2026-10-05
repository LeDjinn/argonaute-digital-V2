export function checkPublishingState(state) {
  const errors = [];
  if (!Array.isArray(state.remotes) || !state.remotes.length || state.remotes.some(remote => !/^(?:https:\/\/(?:LeDjinn@)?github\.com\/LeDjinn\/|git@github\.com:LeDjinn\/)[A-Za-z0-9_.-]+(?:\.git)?$/.test(remote))) errors.push('Only personal github.com/LeDjinn remotes are permitted.');
  if (state.account !== 'LeDjinn') errors.push('LeDjinn must be the active GitHub account.');
  if (state.name !== 'LeDjinn' || state.email !== 'timour.spiridonov@gmail.com') errors.push('Repo-local personal Git identity required.');
  if (state.branch !== 'main') errors.push('Publication requires main branch.');
  if (state.dirty) errors.push('Uncommitted work detected; do not overwrite it.');
  if (!state.localSha || state.localSha !== state.remoteSha) errors.push('Local HEAD must match remote main before drafting.');
  return errors;
}
