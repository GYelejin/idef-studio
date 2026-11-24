import { BlockGenerationTask } from '../../core/llm/types';

export interface PipelineTreeNode {
  task: BlockGenerationTask;
  children: PipelineTreeNode[];
  level: number;
}

export function buildPipelineTree(tasks: BlockGenerationTask[]): PipelineTreeNode[] {
  const taskMap = new Map<string, BlockGenerationTask>();
  const childrenCodeSet = new Set<string>();

  for (const t of tasks) {
    taskMap.set(t.code, t);
    if (t.childBlockCodes) {
      for (const childCode of t.childBlockCodes) {
        childrenCodeSet.add(childCode);
      }
    }
  }

  function createNode(task: BlockGenerationTask, level: number): PipelineTreeNode {
    const children: PipelineTreeNode[] = [];
    if (task.childBlockCodes && task.childBlockCodes.length > 0) {
      for (const childCode of task.childBlockCodes) {
        const childTask = taskMap.get(childCode);
        if (childTask) {
          children.push(createNode(childTask, level + 1));
        }
      }
    }
    return { task, children, level };
  }

  const rootTasks = tasks.filter((t) => !childrenCodeSet.has(t.code));
  if (rootTasks.length === 0 && tasks.length > 0) {
    return [createNode(tasks[tasks.length - 1], 0)];
  }

  return rootTasks.map((t) => createNode(t, 0));
}
