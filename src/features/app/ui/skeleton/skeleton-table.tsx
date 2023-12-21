import clsx from 'clsx';
import SkeletonLine from './skeleton-line';
import './skeleton.scss';

interface SkeletonTableProps {
  className?: string;
  rows: number;
  cols: number;
}

export default function SkeletonTable({ rows, cols, className }: SkeletonTableProps) {
  return (
    <table
      className={clsx(className, 'skeleton-table')}
    >
      <tbody>
        { [...Array(rows).keys()].map((row) => (
          <tr key={row}>
            { [...Array(cols).keys()].map((col) => (
              <td key={col}>
                <SkeletonLine />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
