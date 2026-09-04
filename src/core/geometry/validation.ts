import { ArrowEndpoint, SnapTarget, ICOMRole } from "../../types/idef0";

export interface ArrowValidationResult {
  valid: boolean;
  reason?: string;
  role?: ICOMRole;
}

export function validateArrowConnection(
  source: ArrowEndpoint | SnapTarget,
  target: ArrowEndpoint | SnapTarget
): ArrowValidationResult {
  // 0. Both endpoints cannot be unattached
  if (source.type === 'unattached' && target.type === 'unattached') {
    return {
      valid: false,
      reason: 'Стрелка не может иметь оба неприсоединенных конца!',
    };
  }

  // 1. Target cannot be a block's Right side (Output is only an emitter)
  if (target.type === 'block' && target.side === 'right') {
    return {
      valid: false,
      reason: 'Стрелка не может входить в правую сторону блока (Выход — только для исходящих стрелок!)',
    };
  }

  // 2. Source cannot be a block's Left (Вход), Top (Управление), or Bottom (Механизм)
  if (source.type === 'block') {
    if (source.side === 'left') {
      return {
        valid: false,
        reason: 'Стрелка не может выходить из левой стороны блока (Вход — только для входящих стрелок!)',
      };
    }
    if (source.side === 'top') {
      return {
        valid: false,
        reason: 'Стрелка не может выходить из верхней стороны блока (Управление — только для входящих стрелок!)',
      };
    }
    if (source.side === 'bottom') {
      return {
        valid: false,
        reason: 'Стрелка не может выходить из нижней стороны блока (Механизм — только для входящих стрелок!)',
      };
    }
  }

  // 3. Border Source Semantics
  if (source.type === 'border') {
    if (source.side === 'right') {
      return {
        valid: false,
        reason: 'Стрелка не может начинаться с правой границы холста (Правая граница — только для выхода!)',
      };
    }

    if (target.type === 'block') {
      if (source.side === 'left' && target.side !== 'left') {
        return {
          valid: false,
          reason: 'Стрелка с левой границы холста (Вход) может входить только в левую сторону блока!',
        };
      }
      if (source.side === 'top' && target.side !== 'top') {
        return {
          valid: false,
          reason: 'Стрелка с верхней границы холста (Управление) может входить только в верхнюю сторону блока!',
        };
      }
      if (source.side === 'bottom' && target.side !== 'bottom') {
        return {
          valid: false,
          reason: 'Стрелка с нижней границы холста (Механизм) может входить только в нижнюю сторону блока!',
        };
      }
    } else if (target.type === 'border') {
      return {
        valid: false,
        reason: 'Стрелка не может идти от одной границы холста напрямую к другой без функциональных блоков!',
      };
    }
  }

  // 4. Border Target Semantics
  if (target.type === 'border') {
    if (target.side === 'left') {
      return {
        valid: false,
        reason: 'Стрелка не может входить в левую границу холста (Левая граница — только источник входов!)',
      };
    }
    if (target.side === 'top' || target.side === 'bottom') {
      // Top/Bottom border as target is only valid if source is a block's right side (Выход)
      if (source.type !== 'block' || source.side !== 'right') {
        return {
          valid: false,
          reason: 'Выход на границу холста должен начинаться с правой стороны функционального блока!',
        };
      }
    }
  }

  // 5. Junction & Arrow Segment Semantics (Branching & Merging)
  const isSourceJunction = source.type === 'junction' || source.type === 'arrow_segment';
  const isTargetJunction = target.type === 'junction' || target.type === 'arrow_segment';

  // Prohibit junction-to-junction directly (branch -> merge loop without any blocks)
  if (isSourceJunction && isTargetJunction) {
    return {
      valid: false,
      reason: 'Недопустимое соединение: Разветвление стрелки не может сразу входить в слияние (соединение поток-в-поток запрещено РД IDEF0 - 2000)!',
    };
  }

  // Border source cannot merge directly into another arrow segment
  if (source.type === 'border' && isTargetJunction) {
    return {
      valid: false,
      reason: 'Недопустимое соединение: Стрелка с границы холста не может сливаться с существующим потоком напрямую!',
    };
  }


  // Determine ICOM Role
  let role: ICOMRole = 'input';
  if (target.type === 'block') {
    if (target.side === 'left') role = 'input';
    else if (target.side === 'top') role = 'control';
    else if (target.side === 'bottom') role = 'mechanism';
  } else if (source.type === 'block' && target.type === 'border') {
    role = 'output';
  } else if (source.type === 'arrow_segment' && (source as any).role) {
    role = (source as any).role;
  }

  return {
    valid: true,
    role,
  };
}

